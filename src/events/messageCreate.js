// require disboard utils
const Disbord = require('../utils/disbord'), checkExpiredservers = require('../utils/checkExpiredservers');

module.exports =  async function handleMessage (sharder, message) {
    // disboard
    checkExpiredservers(sharder, false); 
    if (message.author.id == "302050872383242240") return Disbord(message, sharder)

    
    // command logic
    if (!message.content.toLowerCase().startsWith("+") || message.author.bot) return
    const command = ((message.content.slice(1).trim()).split(" "))[0];
    if (!sharder.bot.registeredSlashCMDs.has(command)) return
    message.channel.createMessage({"embeds":[{"description": `It looks like that is a valid command but I have switched to slash commands. Try running /${command}. If none of my commands show up you may need to re-invite me using [this invite]( https://discord.com/oauth2/authorize?client_id=763088956454994000&scope=bot%20applications.commands)`}]})  
}