// require disboard utils
const Disbord = require('../utils/disbord'), checkExpiredservers = require('../utils/checkExpiredservers');

module.exports =  async function handleMessage (sharder, message) {
    // disboard
    checkExpiredservers(sharder, false); 
    if (message.author.id == "302050872383242240") return Disbord(message, sharder)

    // command logic
    if (message.attachments.length !== 0) return
    if (message.author.bot) return
    if (message.channel.type !== 0) return
    if (!message.content.toLowerCase().startsWith(sharder.config.botPrefix)) return
    
    const commands = ((message.content.slice((sharder.config.botPrefix).length).trim()).split(" "));
    if (!sharder.bot.commands.has(`${commands[0]}_Logic`)) return
    
    message.content = commands.splice(1).join(" ");    
    sharder.bot.commands.get(`${commands[0]}_Logic`)({message, sharder})
}