// require libs and files
const config = require('./config.json'), {query} = require('./index'), {Base} = require("eris-sharder"), cron = require('node-cron');
let sharder;

class Class extends Base{
    constructor(bot) {
        super(bot);
    }
    async launch() {
        sharder=this;
        sharder.bot.editStatus("dnd", { name: `${config.botPrefix}help`, type: 0 });
        // decide what to do on message create
        sharder.bot.on('messageCreate', async (message) => {  
            checkExpiredservers() 
            // identify disboard bump messages
            if (message.author.id == "302050872383242240") {
                if (message.embeds[0].description.includes("Bump done")) {
                    var timetobump = new Date(new Date().getTime() + 120 * 60000)
                    var dbrequests = {
                        "guild": await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`),
                        "users": await query(`SELECT * FROM users WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`),
                        "weeklyLB":await query(`SELECT * FROM weeklylb WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)
                    }
                    sendMessage(message.channel.id, { "embed": { "title": `Bumped`, "color": 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } });
                    query((dbrequests.guild.length === 0) ? `INSERT INTO guilds (serverid, channelid, timetobump, bumpmessage) VALUES ('${message.channel.guild.id}', '${message.channel.id}', '${timetobump}', '${config.bumpMessage}')` : `UPDATE guilds SET channelid = '${message.channel.id}', timetobump = '${timetobump}' WHERE serverid = '${message.channel.guild.id}'`)
                    query((dbrequests.users.length===0) ? `INSERT INTO users (serverid, userid, bumps) VALUES ('${message.channel.guild.id}', '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}', 1)` : `UPDATE users SET bumps = ${(dbrequests.users[0].bumps)+1} WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)                    
                    query((dbrequests.weeklyLB.length===0) ? `INSERT INTO weeklylb (serverid, userid, bumps) VALUES ('${message.channel.guild.id}', '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}', 1)`: `UPDATE weeklylb SET bumps = ${(dbrequests.weeklyLB[0].bumps)+1} WHERE serverid = '${message.channel.guild.id}' AND userid = '${((message.embeds[0].description.split("<@"))[1].split(">, "))[0]}'`)
                    if (dbrequests.guild[0].constlbchannelid){
                        editMessage(dbrequests.guild[0].constlbchannelid, dbrequests.guild[0].constlbmsgid, {"embed": {"title": `Scoreboard`,"description":await makeserverLB(dbrequests.guild[0].serverid , 'allTime', message),"color": 5747894,"timestamp": new Date().toISOString()}})
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
                switch (commands[0].toLowerCase()) {
                    // help command
                    case `help`:
                    case `help ${commands[1]}`:
                        var helpMessage = {
                            'help': { "embed": { "title": "Help", "color": 5747894, "timestamp": new Date().toISOString(), "fields": [{ "name": "__Usage__", "value": "Lists all commands.\n```" + config.botPrefix + "help```\nGives information about a specific command.\n```" + config.botPrefix + "help <command>```" }] }},
                            'setbumpmessage': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Allows you to change the bump reminder message.\n```" + config.botPrefix + "setbumpmessage <YOUR_BUMP_MESSAGE>```"},{"name": "__Restrictions__","value": "Only an admin or the server owner can use this command"}]}},
                            'info': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows info about the bot.\n```" + config.botPrefix + "info```"}]}},
                            'user': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows a users total bumps.\n```" + config.botPrefix + "user```\n```" + config.botPrefix + "user @ USER```\n```" + config.botPrefix + "user <USER_ID>```"}]}},
                            'setstaticlb': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Sets the leaderboard to update after every bump.\nTo get the messages url, right click on the message then click on 'Copy Message Link.'\n```" + config.botPrefix + "setstaticlb <message_url>```"},{"name": "__Example__","value": "```" + config.botPrefix + "setstaticlb https://discord.com/channels/672259037861117964/692113116338585651/727258385925537861```"}]}},
                            'scoreboard': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows the top bumpers.\n```" + config.botPrefix + "scoreboard```"},{"name": "__Alias__","value": "```" + config.botPrefix + "leaderboard```"}]}},
                            'leaderboard': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows the top bumpers.\n```" + config.botPrefix + "leaderboard```"},{"name": "__Alias__","value": "```" + config.botPrefix + "scoreboard```"}]}},
                            'weeklyscoreboard': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows the top bumpers of the week.\n```" + config.botPrefix + "weeklyscoreboard```"},{"name": "__Alias__","value": "```" + config.botPrefix + "weeklyleaderboard```"}]}},
                            'weeklyleaderboard': {"embed": {"title": "Help","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "__Usage__","value": "Shows the top bumpers of the week.\n```" + config.botPrefix + "weeklyleaderboard```"},{"name": "__Alias__","value": "```" + config.botPrefix + "weeklyscoreboard```"}]}}
                        }[commands[1]?.toLowerCase()]
                        sendMessage(message.channel.id, helpMessage ? helpMessage : {"embed": { "title": "Help ", "description": `Below is a list of my commands.\nFor more details on any command use **${config.botPrefix}help <command>**\nFor further help you can join the [support server](${config.links["Support server"]})`, "fields": [{ "name": "General commands", "value": "```\nscoreboard\nweeklyscoreboard\nuser\ninfo```", "inline": true }, { "name": "Admin commands", "value": "```\nsetbumpmessage\nsetstaticlb```", "inline": true }], "color": 5747894, "timestamp": new Date().toISOString()}})
                    break;
            
                    // set bump message command
                    case `setbumpmessage`:
                    case `setbumpmessage ${(message.content).slice((config.botPrefix.length) + 15)}`:
                        if (commands[1]){
                            if (message.member.guild.ownerID === message.author.id || message.member.permission.has("administrator")){
                                var guild = await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`)
                                if (guild.length === 0) {
                                    sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}});
                                }else{
                                    query(`UPDATE guilds SET bumpmessage = '${(message.content).slice((config.botPrefix.length) + 15)}' WHERE serverid = '${message.channel.guild.id}'`);
                                    sendMessage(message.channel.id, {"embed": {"title": `Done`,"description":"The new reminder message for this server is: `"+(message.content).slice((config.botPrefix.length) + 15)+"`", "color": 5747894,"timestamp": new Date().toISOString()}});
                                }
                            }else{
                                sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}});
                            }
                        }else{
                            sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Improper syntax. Refer to `"+config.botPrefix+"help "+commands[0].toLowerCase()+"` for the proper syntax", "color": 5747894,"timestamp": new Date().toISOString()}});
                        }
                    break;
            
                    // set static lb
                    case `setstaticlb`:
                    case `setstaticlb ${(message.content).slice((config.botPrefix.length) + 12)}`:
                        if (commands[1]){
                            if (message.member.guild.ownerID === message.author.id || message.member.permission.has("administrator")){
                                var guild = await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`)
                                if (guild.length === 0) {
                                    sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}});
                                }else{
                                    var args = ((message.content).slice((config.botPrefix.length) + 12).split("/"))
                                    args=args.slice(args.length-2)
                                    query(`UPDATE guilds SET constlbchannelid = '${args[0]}', constlbmsgid = '${args[1]}' WHERE serverid = '${message.channel.guild.id}'`);
                                    sendMessage(message.channel.id, {"embed": {"title": `Done`,"description":`The message provided will be updated every bump.`, "color": 5747894,"timestamp": new Date().toISOString()}});
                                }
                            }else{
                                sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}});
                            }
                        }else{
                            sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Improper syntax. Refer to `"+config.botPrefix+"help "+commands[0].toLowerCase()+"` for the proper syntax", "color": 5747894,"timestamp": new Date().toISOString()}});
                        }
                    break;

                    case `weeklyleaderboard`:
                    case `weeklyscoreboard`:
                        sendMessage(message.channel.id, {"embed": {"title": `Scoreboard`,"description":await makeserverLB(message.channel.guild.id, 'week', message), "color": 5747894,"timestamp": new Date().toISOString()}});
                    break;
            
                    // score board command
                    case `leaderboard`:
                    case `scoreboard`:
                        sendMessage(message.channel.id, {"embed": {"title": `Scoreboard`,"description":await makeserverLB(message.channel.guild.id, 'allTime', message), "color": 5747894,"timestamp": new Date().toISOString()}});
                    break;
                    
                    // user stats
                    case `user`:
                    case `user ${commands[1]}`:
                        var userid = commands[1] ? (((((commands[1]).replace("<", "")).replace("@","")).replace("!","")).replace(">","")) : message.author.id, total = 0;
                        await (await query(`SELECT * FROM users WHERE userid = '${userid}'`)).map(({bumps})=>{total+= parseInt(bumps)})
                        sendMessage(message.channel.id, {"embed": {"title": `User stats`,"description": `Total bumps: **${total}**`, "color": 5747894,"timestamp": new Date().toISOString()}});
                    break
                    
                    //info command
                    case `info`:
                        var embed = {"embed": {"title": "Info","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "Bot","value": `**Shard Ping: ** ${message.channel.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${config.MaxShards}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,"inline": false},{"name": `Creator`,"value": `[numselli#6964](https://numselli.github.io)`,"inline": false},{"name": `Links`,"value": ``,"inline": false}]}}
                        for (let item in config.links){
                            embed.embed.fields[embed.embed.fields.length-1].value+=`[${item}](${config.links[item]})\n`
                        }
                        sendMessage(message.channel.id, embed);
                    break;
                }
            }
        });
        
        cron.schedule('* * * * *', checkExpiredservers);

        async function checkExpiredservers(){
            var today = new Date()
            if(today.getDay() == 0 && today.getHours() == 24){
                query(`DELETE FROM weeklylb`)
            }
            (await query(`SELECT * FROM guilds`)).map(guild => {
                var date = new Date();
                if (guild.timetobump !== "timetobump") {
                    if (date >= new Date(guild.timetobump)) {
                        sendMessage(guild.channelid, guild.bumpmessage)
                        query(`UPDATE guilds SET timetobump = 'timetobump' WHERE serverid = '${guild.serverid}'`);
                    }
                }
            });
        }
        
        async function makeserverLB(serverID, durration, message){
            var totalBumps = 0,
            userlist = await Promise.all(
                (await query(`SELECT * FROM ${(durration=="allTime") ? "users": "weeklylb"} WHERE serverid = '${serverID}' order by bumps desc`))
                .map(async (user, index)=>{
                    totalBumps+=parseInt(user.bumps)
                    var {username, discriminator} = await getuser(user.userid, message);
                    return ((index+1)+"  |  "+user.bumps+"  |  "+username+"#"+discriminator+"\n")
                })
            );
            return "```ml\n'Rank'  '|'  'Bumps'  '|'  'User'\n'=============================='``` ```"+userlist.join('')+ "```\nTotal bumps: **"+totalBumps+"**"; 
        }
        
        async function sendMessage(channelID, content) {
            if ((sharder.bot.getChannel(channelID)).permissionsOf(sharder.bot.user.id).has("sendMessages") && (sharder.bot.getChannel(channelID)).permissionsOf(sharder.bot.user.id).has("embedLinks") && (sharder.bot.getChannel(channelID)).permissionsOf(sharder.bot.user.id).has("readMessages")) {
                sharder.bot.createMessage(channelID, content);
            }else{
                console.error("I don't have perms")
            }
        }
        
        async function getuser(userid, message){
            var cachedUser = message ? message.channel.guild.members.get(userid) : false
            return cachedUser ?  cachedUser.user : await sharder.bot.getRESTUser(userid)
        }
         
        async function editMessage(channelID, messageID, content){
            sharder.bot.editMessage(channelID, messageID, content)
        }
    }
}

module.exports = Class;