// require libs and files
const {query} = require('./index'), {botPrefix} = require('./config.json'), {Base} = require("eris-sharder"), cron = require('node-cron'), fs = require('fs/promises'), {createCanvas} = require('canvas');
let sharder, runCmds = {};

module.exports = class Class extends Base{
    constructor(bot) {
        super(bot);
    }
    async launch() {
        sharder=this;

        // init commands
        (async function initcommans (){
            (await fs.readdir('commands')).forEach(async catagory=>{
                if (catagory.startsWith('.')) return
                (await fs.readdir(`commands/${catagory}`)).forEach(command=>{
                    if (command.startsWith('.')) return
                    let {commandLogic, help} = require(`./commands/${catagory}/${command}`)
                    runCmds[command.split(".js")[0]] = {commandLogic, help, catagory}
                })
            })

            // set status
            sharder.bot.editStatus("dnd", {name: `${botPrefix}help`,type: 0});
        })()
        
        // decide what to do on message create
        sharder.bot.on('messageCreate', async (message) => {  
            checkExpiredservers() 
            // identify disboard bump messages
            if (message.author.id == "302050872383242240") {
                if (message.embeds[0].description.includes(":thumbsup:")) {
                    const timetobump = new Date().getTime() + 120 * 60000
                    const dbrequests = {
                        "guild": await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]}),
                        "users": await query({text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]}),
                        "weeklyLB":await query({text: 'SELECT * FROM weeklylb WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
                    }
                    message.channel.createMessage( { "embed": { "title": `Bumped`, "color": 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err))
                    if (dbrequests.guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]})
                    else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values: [message.channel.id, timetobump, message.channel.guild.id]})    
                    if (dbrequests.users.length===0) await query({text: 'INSERT INTO users (serverid, userid) VALUES ($1, $2)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
                    else await query({text: 'UPDATE users SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.users[0].bumps)+1, message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
                    if (dbrequests.weeklyLB.length===0) query({text: 'INSERT INTO weeklylb (serverid, userid, bumps) VALUES ($1, $2, $3)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0], 1]})
                    else query({text: 'UPDATE weeklylb SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.weeklyLB[0].bumps)+1, message.channel.guild.id,((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
                    if (dbrequests.guild[0].constlbchannelid){
                        sharder.bot.deleteMessage(dbrequests.guild[0].constlbchannelid, dbrequests.guild[0].constlbmsgid, "reason").catch(err => console.error("Cannot delete this message", err));
                        let updatedChannel = await sharder.bot.createMessage(dbrequests.guild[0].constlbchannelid,{"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: await makeserverLB(message.channel.guild.id, 'allTime')}).catch(err => console.error("Cannot send messages to this channel", err))
                        query({text: 'UPDATE guilds SET constlbmsgid = $1 WHERE serverid = $2', values: [updatedChannel.id, message.channel.guild.id]})
                    }

                }else if (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump")){                    
                    const timetobump = new Date().getTime() + ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(" ", "").replace(" ", ""))) * 60000)
                    const guild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]})
                    message.channel.createMessage({ "embed": { "title": `Bump Failed`, "color": 15420513, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err))
                    if (guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
                    else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values:[message.channel.id, timetobump, message.channel.guild.id]})                    
                }
            }
            // commands
            else if (message.attachments.length === 0 && !message.author.bot && message.channel.type === 0 && Object.keys(runCmds).some(v => (message.content.split(" ")[0]).includes(v)) && ((message.content).toLowerCase()).startsWith(botPrefix)) {
                const commands = ((message.content.slice((botPrefix).length).trim()).split(" "))
                message.content = commands.splice(1).join(" ")
                runCmds[commands[0]].commandLogic({query, makeserverLB, message, sharder, runCmds})
            }
        });
        
        cron.schedule("0 0 * * *", ()=>{checkExpiredservers(true)})
        cron.schedule("* * * * *", ()=>{checkExpiredservers()})
        async function checkExpiredservers(dailyCheck){
            const today = new Date(), time = today.getTime()

            if (dailyCheck && today.getDay() == 0){
                const weeklylbdata = await query({text: 'SELECT serverid FROM weeklylb', values: []});
                await Promise.all(await weeklylbdata.map(async server=>{
                    const guild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [server.serverid]});
                    if (!guild[0].constlbchannelid) return
                    if (guild[0].weekly_lb_message_id) await sharder.bot.deleteMessage(guild[0].constlbchannelid, guild[0].weekly_lb_message_id).catch(err => console.error("Cannot delete message", err));
                    const updatedChannel = await sharder.bot.createMessage(guild[0].constlbchannelid, {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: await makeserverLB(server.serverid, 'week')}).catch(err => console.error("Cannot send messages to this channel", err));
                    query({text: 'UPDATE guilds SET weekly_lb_message_id = $1 WHERE serverid = $2', values: [updatedChannel.id, server.serverid]})
                }))
                
                query({text: 'DELETE FROM weeklylb', values: []});
            }

            const remindGuilds = await query({text: 'SELECT * FROM guilds WHERE timetobump != $1 AND timetobump <= $2', values: [0, time]})
            remindGuilds.map(guild => {
                sharder.bot.createMessage(guild.channelid, guild.bumpmessage).catch(err => console.error("Cannot send messages to this channel", err));
                query({text: 'UPDATE guilds SET timetobump = $1 WHERE serverid = $2', values: [0, guild.serverid]});
            });
        }
        
        async function makeserverLB(serverID, durration){
            const table = await query((durration=="allTime") ? {text: 'SELECT * FROM users WHERE serverid = $1  order by bumps desc fetch first 8 rows only', values: [serverID]} : {text: 'SELECT * FROM weeklylb WHERE serverid = $1  order by bumps desc fetch first 8 rows only', values: [serverID]}), canvas = createCanvas(800, 800), ctx = canvas.getContext('2d');
            let totalBumps = 0;
            ctx.fillStyle = '#5f2c82', ctx.fillRect(0, 0, canvas.width, canvas.height); 
            ctx.font = '30px Impact', ctx.fillStyle = "#ffffff", ctx.strokeStyle = '#ffffff';
            ctx.beginPath(), ctx.lineTo(0, 50), ctx.lineTo(800, 50), ctx.stroke();
            ctx.fillText('rank', 10, 30), ctx.fillText('username', (canvas.width/2)-90, 30), ctx.fillText("bumps", canvas.width-90, 30);
            await Promise.all(await table.map(async (user, index)=>{
                const {username, discriminator} = sharder.bot.users.get(user.userid) || await sharder.bot.getRESTUser(user.userid);
                totalBumps+=user.bumps;
                ctx.fillText(index, 30, 100*index), ctx.fillText(`${username}#${discriminator}`, (canvas.width/2)-90, 100*index), ctx.fillText(user.bumps, canvas.width-90, 100*index);
            }))
            ctx.fillText(`Total bumps: ${totalBumps}`, 70, canvas.height-50)
            return canvas.toBuffer()
        }
    }
}