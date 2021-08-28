const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === message.author.id) return interaction.createMessage({"flags":64, "content": "You cant cuddle yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const cuddle = ranChance>=0.5 ? await (await fetch('https://purrbot.site/api/img/sfw/cuddle/gif')).json() : await sharder.nekoslife.sfw.cuddle();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${message.mentions[0].username} was cuddled by ${message.author.username}`,
            "color": 2717868,
            "image": {
                "url": cuddle[ranChance>=0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}
 
module.exports.description = "Cuddle someone"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to cuddle",
        "type": 6,
        "required": true,
    }
]