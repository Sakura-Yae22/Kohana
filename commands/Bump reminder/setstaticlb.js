module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, query, commands} = itemsToImport;
        if (! commands[1]) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Improper syntax.", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
            
        if (!message.member.permission.has("administrator")) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
        
        var guild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]})
        
        if (guild.length === 0) return message.channel.createMessage( {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
    
        query({text: 'UPDATE guilds SET constlbchannelid = $1 , constlbmsgid = $2 WHERE serverid = $1', values: [message.channelMentions[0], message.channel,guild.id, message.channel.guild.id]});
        message.channel.createMessage( {"embed": {"title": `Done`,"description":`The message provided will be updated every bump.`, "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
        
    },
    "help":[                            
        {"name": "__Usage__","value": "Sets the leaderboard to update after every bump.\nTo get the messages url, right click on the message then click on 'Copy Message Link.'\n```??botPrefix??setstaticlb <message_url>```"},
        {"name": "__Example__","value": "```??botPrefix??setstaticlb <mention channel>```"}
    ]
}