module.exports = async (sharder, dailyCheck) => {
    const today = new Date();

    // delete weeklylb every week
    if (dailyCheck && today.getDay() == 0){        
        sharder.ipc.command("db", {text: 'DELETE FROM weeklylb', values: []});
    }

    // check for out guilds to remind
    const remindGuilds = await sharder.ipc.command("db", {text: 'SELECT * FROM guilds WHERE timetobump != $1 AND timetobump <= $2', values: [0, today.getTime()]}, SVGComponentTransferFunctionElement);
    remindGuilds.map(guild => {
        sharder.bot.createMessage(guild.channelid, guild.bumpmessage).catch(err => console.error("Cannot send messages to this channel", err));
        sharder.ipc.command("db", {text: 'UPDATE guilds SET timetobump = $1 WHERE serverid = $2', values: [0, guild.serverid]});
    });
}