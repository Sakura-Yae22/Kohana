const cron = require('node-cron');
// sharder.ipc.command("db", , true);

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