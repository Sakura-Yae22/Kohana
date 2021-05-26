module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, query, config, commands} = itemsToImport;
        if (! commands[1]) return sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Improper syntax. Refer to `"+config.botPrefix+"help "+commands[0].toLowerCase()+"` for the proper syntax", "color": 5747894,"timestamp": new Date().toISOString()}});
            
        if (!message.member.permission.has("administrator")) return sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"You must be the owner of this server or an administrator.", "color": 5747894,"timestamp": new Date().toISOString()}});
        
        var guild = await query(`SELECT * FROM guilds WHERE serverid = '${message.channel.guild.id}'`)
        
        if (guild.length === 0) return sendMessage(message.channel.id, {"embed": {"title": `Error`,"description":"Make a valid bump first", "color": 5747894,"timestamp": new Date().toISOString()}});
    
        var args = ((message.content).slice((config.botPrefix.length) + 12).split("/")) .slice(((message.content).slice((config.botPrefix.length) + 12).split("/")).length-2)
        query(`UPDATE guilds SET constlbchannelid = '${args[0]}', constlbmsgid = '${args[1]}' WHERE serverid = '${message.channel.guild.id}'`);
        sendMessage(message.channel.id, {"embed": {"title": `Done`,"description":`The message provided will be updated every bump.`, "color": 5747894,"timestamp": new Date().toISOString()}});
        
    },
    "help":[                            
        {"name": "__Usage__","value": "Sets the leaderboard to update after every bump.\nTo get the messages url, right click on the message then click on 'Copy Message Link.'\n```??botPrefix??setstaticlb <message_url>```"},
        {"name": "__Example__","value": "```??botPrefix??setstaticlb https://discord.com/channels/672259037861117964/692113116338585651/727258385925537861```"}
    ]
}