module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message, sharder, settings}=itemsToImport;
        const cmdArguments = message.content.split(" ");

        if (!cmdArguments[0]) return message.channel.createMessage({"embed": {"title": "Incorect arguments","color": 5747894,"timestamp": new Date().toISOString(),"description": "Proper syntax is `"+settings.prefix+"prefix <new prefix>`"}}).catch(err=>console.error("Cannot send messages to this channel"));
        
        if (!message.member.permissions.has("administrator")) return message.channel.createMessage({"embed": {"title": "You must be the owner of this server or an administrator","color": 5747894,"timestamp": new Date().toISOString()}}).catch(err=>console.error("Cannot send messages to this channel"));
        if (!new RegExp(/\[a-zA-Z0-9]|\$|\<|\>|\,|\.|\/|\?|\?|\||\[|\]|\{|\}\`|\~|\!|\%|\^|\&|\*|\(|\)|\_|\-|\+|\=|\:|\;|\'|\" + /g).test(cmdArguments[0].toString())) return message.channel.createMessage({"embed": {"title": `${cmdArguments[0]} can't be used as a prefix`,"color": 5747894,"timestamp": new Date().toISOString()}}).catch(err=>console.error("Cannot send messages to this channel"));       
        sharder.query({text: 'UPDATE serverdata SET prefix = $1 WHERE serverid = $2' ,values: [cmdArguments[0], message.channel.guild.id]})
        message.channel.createMessage({"embed": {"title": `**${cmdArguments[0]}** is your new prefix`,"color": 5747894,"timestamp": new Date().toISOString()}}).catch(err=>console.error("Cannot send messages to this channel")); 
    },
    "help":[
        {"name": "__Usage__","value": "Change my prefix.\n```??botPrefix??prefix <prefix>```"},
        {"name": "__Restrictions__","value": "Only an admin or the server owner can use this command\nSome prefixes such as **@** or **#** can't be used"}
    ]
};