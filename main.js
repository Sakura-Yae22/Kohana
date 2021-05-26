// require libs and files
const  {query, config} = require('./index'), {Base} = require("eris-sharder"), puppeteer = require("puppeteer"), cron = require('node-cron'), fs = require('fs');
let sharder, runCmds = {};

module.exports = class Class extends Base{
    constructor(bot) {
        super(bot);
    }
    async launch() {
        sharder=this;

        // init commands
        (async function initcommans (){
            let catagorys = fs.readdirSync('commands')
            for await (const catagory of catagorys){
                if (catagory != ".DS_Store"){
                    let caragoryCommands = fs.readdirSync(`commands/${catagory}`)
                    for await (const command of caragoryCommands){
                        if (command != ".DS_Store"){
                            let {commandLogic,help} = await require(`./commands/${catagory}/${command}`)
                            runCmds[command.split(".js")[0]] = {commandLogic, help, catagory}
                        }
                    }
                }
            }
        })()
        // init commands
//         (async function initcommans (){
//             (await fs.readdir('commands')).forEach(async catagory=>{
//                 if (catagory.startsWith('.')) return
//                 (await fs.readdir(`commands/${catagory}`)).forEach(command=>{
//                     if (command.startsWith('.')) return
//                     let {commandLogic, help} = require(`./commands/${catagory}/${command}`)
//                     runCmds[command.split(".js")[0]] = {commandLogic, help, catagory}
//                 })
//             })

//             // set status
//             sharder.bot.editStatus("dnd", {name: `${config.botPrefix}help`,type: 0});
//         })()

        // set status
        sharder.bot.editStatus("dnd", { name: `${config.botPrefix}help`, type: 0 });
        
        // decide what to do on message create
        sharder.bot.on('messageCreate', async (message) => {  
            checkExpiredservers() 
            // identify disboard bump messages
            if (message.author.id == "302050872383242240") {
                if (message.embeds[0].description.includes(":thumbsup:")) {
                    var timetobump = new Date(new Date().getTime() + 120 * 60000)
                    var dbrequests = {
                        "guild": await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`),
                        "users": await query(`SELECT * FROM users WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`),
                        "weeklyLB":await query(`SELECT * FROM weeklylb WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)
                    }
                    sendMessage(message.channel.id, { "embed": { "title": `Bumped`, "color": 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } });
                    query((dbrequests.guild.length === 0) ? `INSERT INTO guilds (serverid, channelid, timetobump, bumpmessage) VALUES ('${message.channel.guild.id}', '${message.channel.id}', '${timetobump}', '${config.bumpMessage}')` : `UPDATE guilds SET channelid = '${message.channel.id}', timetobump = '${timetobump}' WHERE serverid = '${message.channel.guild.id}'`)
                    await query((dbrequests.users.length===0) ? `INSERT INTO users (serverid, userid, bumps) VALUES ('${message.channel.guild.id}', '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}', 1)` : `UPDATE users SET bumps = ${(dbrequests.users[0].bumps)+1} WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)                    
                    query((dbrequests.weeklyLB.length===0) ? `INSERT INTO weeklylb (serverid, userid, bumps) VALUES ('${message.channel.guild.id}', '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}', 1)`: `UPDATE weeklylb SET bumps = ${(dbrequests.weeklyLB[0].bumps)+1} WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)
                    if (dbrequests.guild[0].constlbchannelid){
                       
                        if (dbrequests.guild[0].constlbmsgid) await sharder.bot.deleteMessage(dbrequests.guild[0].constlbchannelid, dbrequests.guild[0].constlbmsgid, "reason")

                        let updatedChannel = await sendMessage(dbrequests.guild[0].constlbchannelid, {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: await makeserverLB(message.channel.guild.id, 'allTime', message)});

                        query(`UPDATE guilds SET constlbmsgid = '${updatedChannel.id}' WHERE serverid = '${message.channel.guild.id}'`)
                    }
                }else if (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump")){                    
                    var timetobump = new Date(new Date().getTime() + (parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(" ", "").replace(" ", ""))) * 60000)
                    var guild = await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`)
                    sendMessage(message.channel.id, { "embed": { "title": `Bump Failed`, "color": 15420513, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } });
                    query((guild.length === 0) ? `INSERT INTO guilds (serverid, channelid, timetobump, bumpmessage) VALUES ('${message.channel.guild.id}', '${message.channel.id}', '${timetobump}', '${config.bumpMessage}')` : `UPDATE guilds SET channelid = '${message.channel.id}', timetobump = '${timetobump}' WHERE serverid = '${message.channel.guild.id}'`);
                }
            }
            // ignore lots of messages
            else if (message.attachments != 0 || message.author.bot || message.channel.type != 0) {
                return
            }
            // commands
            else if (((message.content).toLowerCase()).startsWith(config.botPrefix)) {
                var commands = ((message.content.slice((config.botPrefix).length).trim()).split(" "))
                
                message.content = commands.join(" ")
                runCmds[commands[0]].commandLogic({sendMessage, query, makeserverLB, getuser, commands, config, message, sharder, runCmds, randomColor})
            }
        });
        
        cron.schedule("0 0 * * *", ()=>{checkExpiredservers(true)})
        cron.schedule("* * * * *", ()=>{checkExpiredservers()})

        async function checkExpiredservers(dailyCheck){
            var today = new Date()
            if (dailyCheck && today.getDay() == 0){
                var weeklylbdata = await query(`SELECT serverid FROM weeklylb`);
                var serverids = Array.from(new Set(weeklylbdata.map(tempObject => tempObject.serverid)))
                serverids.forEach(async(serverid)=>{
                    if (serverid == "672259037861117964"){
                        let guild = await query(`SELECT * FROM guilds WHERE serverid = '${serverid}'`);
                        if (guild[0].constlbchannelid){
                            if (guild[0].weekly_lb_message_id) await sharder.bot.deleteMessage(guild[0].constlbchannelid, guild[0].weekly_lb_message_id, "reason")
        
                            let updatedChannel = await sendMessage(guild[0].constlbchannelid, {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: await makeserverLB(serverid, 'week', message)});
        
                            query(`UPDATE guilds SET weekly_lb_message_id = '${updatedChannel.id}' WHERE serverid = '${serverid}'`)
                        }
                    }
                }) 
                
                query(`DELETE FROM weeklylb`);
            }
            (await query(`SELECT * FROM guilds`)).map(guild => {
                if (guild.timetobump !== "timetobump" && today >= new Date(guild.timetobump)) {
                    sendMessage(guild.channelid, guild.bumpmessage)
                    query(`UPDATE guilds SET timetobump = 'timetobump' WHERE serverid = '${guild.serverid}'`);
                }
            });
        }
        
        async function makeserverLB(serverID, durration, message){
            var totalBumps = 0, htmldata = `<!DOCTYPE html><html><body><h2 style="padding-left: 18%;">Scoreboard</h2><table><thead><tr><th>Rank</th><th>User</th><th>Bumps</th></tr></thead><tbody>`
            
            htmldata += await Promise.all(
                (await query(`SELECT * FROM ${(durration=="allTime") ? "users": "weeklylb"} WHERE serverid = '${serverID}' order by bumps desc fetch first 15 rows only`))
                .map(async (user, index)=>{
                    totalBumps+=user.bumps
                    var {username, discriminator} = await getuser(user.userid);
                    return `<tr><th>${index+1}</th><th>${username}#${discriminator}</th><th>${user.bumps}</th></tr>`
                })
            ).then(data=>{
                return data.join("")
            })

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`data:text/html;base64;charset=UTF-8,${Buffer.from(`${htmldata}</tbody></table>  <style>table, td {border: 1px solid rgba(255, 255, 255, 0.604); border-collapse: collapse;}body{color: #ffffff;margin: 0;background: linear-gradient(45deg, #49a09d, #5f2c82);font-family: sans-serif;font-weight: 150;} th, td { padding: 15px; background-color: rgba(255, 255, 255, 0.2); }</style></body></html>`).toString("base64")}`, {waitUntil: "load"})

           let imgbuffer =  await page.screenshot({type: 'png', fullPage: true});
            
            browser.close();

            return imgbuffer
        }
        
        async function sendMessage(channelID, content, file) {
            var Channel = sharder.bot.getChannel(channelID), canSend = (Channel.permissionsOf(sharder.bot.user.id).has("sendMessages") && Channel.permissionsOf(sharder.bot.user.id).has("embedLinks") && Channel.permissionsOf(sharder.bot.user.id).has("readMessages"))
            if (canSend){
                let sentMessage = await sharder.bot.createMessage(channelID, content, file)
                .catch(err => console.error("Cannot send messages to this channel", err));
                return sentMessage
            }
        }
        
        // get user from cache fist then get from discord api
        async function getuser(userid){
            return sharder.bot.users.get(userid) || await sharder.bot.getRESTUser(userid)
        }

        // random hex code
        async function randomColor(){
            return Math.floor(Math.random() * 16777214) + 1
        }
    }
}