// require libs and files
const {links, query} = require('./index'), {BaseClusterWorker} = require('eris-fleet'), cron = require('node-cron'), fs = require('fs/promises');
let sharder;

module.exports = class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);
        
        this.bot.commands = new Map();
        this.links = links;
        this.query = query;
        this.config = require('./static/config.json')
        sharder=this;

        // init commands
        (async () => {
            (await fs.readdir('commands')).forEach(async catagory=>{
                if (catagory.startsWith('.')) return;
                (await fs.readdir(`commands/${catagory}`)).forEach(command=>{
                    if (command.startsWith('.')) return;
                    const {commandLogic, help} = require(`./commands/${catagory}/${command}`);
                    const cmd = command.split(".js")[0]
                    sharder.bot.commands.set(`${cmd}_Logic`, commandLogic);
                    sharder.bot.commands.set(`${cmd}_help`, help);
                    sharder.bot.commands.set(`${cmd}_catagory`, catagory);
                });
            });
        })();

        this.bot.on('messageCreate', handleMessage.bind(this));
    }

    shutdown(done) {
        done();
    }
}
  
async function handleMessage (message) {
    checkExpiredservers(); 

    // disboard bump messages
    if (message.author.id == "302050872383242240") Disbord(message)
    
    // commands
    if (message.attachments.length !== 0) return
    if (message.author.bot) return
    if (message.channel.type !== 0) return
    if (! message.content.toLowerCase().startsWith(sharder.config.botPrefix)) return

    const commands = ((message.content.slice((sharder.config.botPrefix).length).trim()).split(" "));
    if (!sharder.bot.commands.has(`${commands[0]}_Logic`)) return
    
    message.content = commands.splice(1).join(" ");

    sharder.bot.commands.get(`${commands[0]}_Logic`)({message, sharder})
};

cron.schedule("0 0 * * *", ()=>{checkExpiredservers(true)});
cron.schedule("* * * * *", ()=>{checkExpiredservers()});
async function checkExpiredservers(dailyCheck){
    const today = new Date(), time = today.getTime();

    if (dailyCheck && today.getDay() == 0){        
        query({text: 'DELETE FROM weeklylb', values: []});
    }

    const remindGuilds = await query({text: 'SELECT * FROM guilds WHERE timetobump != $1 AND timetobump <= $2', values: [0, time]});
    remindGuilds.map(guild => {
        sharder.bot.createMessage(guild.channelid, guild.bumpmessage).catch(err => console.error("Cannot send messages to this channel", err));
        query({text: 'UPDATE guilds SET timetobump = $1 WHERE serverid = $2', values: [0, guild.serverid]});
    });
}

async function Disbord(message){
    if (message.embeds[0].description.includes(":thumbsup:")) {
        const timetobump = new Date().getTime() + 120 * 60000;
        const dbrequests = {
            "guild": await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]}),
            "users": await query({text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]}),
            "weeklyLB":await query({text: 'SELECT * FROM weeklylb WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
        };
        message.channel.createMessage( { "embed": { "title": `Bumped`, "color": 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err));
        if (dbrequests.guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values: [message.channel.id, timetobump, message.channel.guild.id]});    
        if (dbrequests.users.length===0) await query({text: 'INSERT INTO users (serverid, userid) VALUES ($1, $2)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        else await query({text: 'UPDATE users SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.users[0].bumps)+1, message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        if (dbrequests.weeklyLB.length===0) query({text: 'INSERT INTO weeklylb (serverid, userid, bumps) VALUES ($1, $2, $3)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0], 1]});
        else query({text: 'UPDATE weeklylb SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.weeklyLB[0].bumps)+1, message.channel.guild.id,((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        if (dbrequests.guild[0].constlbchannelid){
            sharder.bot.deleteMessage(dbrequests.guild[0].constlbchannelid, dbrequests.guild[0].constlbmsgid, "reason").catch(err => console.error("Cannot delete this message", err));
            const bumpLB =  await sharder.ipc.command("makeserverLB", {guildID: message.channel.guild.id, durration: "allTime", bot:sharder.bot}, true)
            let updatedChannel = await sharder.bot.createMessage(dbrequests.guild[0].constlbchannelid,{"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: Buffer.from(bumpLB.data)}).catch(err => console.error("Cannot send messages to this channel", err));
            query({text: 'UPDATE guilds SET constlbmsgid = $1 WHERE serverid = $2', values: [updatedChannel.id, message.channel.guild.id]});
        }

    }else if (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump")){                    
        const timetobump = new Date().getTime() + ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(" ", "").replace(" ", ""))) * 60000);
        const guild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]});
        message.channel.createMessage({ "embed": { "title": `Bump Failed`, "color": 15420513, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err));
        if (guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values:[message.channel.id, timetobump, message.channel.guild.id]});                    
    }
}