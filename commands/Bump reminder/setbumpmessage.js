module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, query, config, commands} = itemsToImport;

        if (!commands[1]) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Improper syntax. Refer to `"+config.botPrefix+"help "+commands[0].toLowerCase()+"` for the proper syntax", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
        if (!message.member.permission.has("administrator")) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));

        var guild = await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`)
        
        if (guild.length === 0) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));

        query(`UPDATE guilds SET bumpmessage = '${(message.content).slice((config.botPrefix.length) + 15)}' WHERE serverid = '${message.channel.guild.id}'`);
        message.channel.createMessage( {"embed": {"title": `Done`,"description":"The new reminder message for this server is: `"+(message.content).slice((config.botPrefix.length) + 15)+"`", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
        
    },
    "help":[
        {"name": "__Usage__","value": "Allows you to change the bump reminder message.\n```??botPrefix??setbumpmessage <YOUR_BUMP_MESSAGE>```"},
        {"name": "__Restrictions__","value": "Only an admin or the server owner can use this command"}
    ]
}