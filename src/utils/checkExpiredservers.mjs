import {query} from '../utils/database.mjs'

export default async (bot) => {
    const today = new Date();

    // check for out guilds to remind
    const remindGuilds = await query({text: 'SELECT * FROM guilds WHERE timetobump != $1 AND timetobump <= $2', values: [0, today.getTime()]});
    remindGuilds.map(guild => {
        bot.createMessage(guild.channelid, guild.bumpmessage).catch(err => console.error("Cannot send messages to this channel", err));
        query({text: 'UPDATE guilds SET timetobump = $1 WHERE serverid = $2', values: [0, guild.serverid]});
    });
}