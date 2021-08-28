const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === message.author.id) return interaction.createMessage({"flags":64, "content": "You cant hug yourself."}).catch(err => console.error("Cannot send messages to this channel", err));
    
    const hug = await fetch((nekosLifeRandChance >= 0.5) ? 'https://purrbot.site/api/img/sfw/hug/gif' : "https://anime-api.hisoka17.repl.co/img/hug");
    const hugJSON = await hug.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${message.mentions[0].username} was hugged by ${message.author.username}`,
            "color": 2717868,
            "image": {
                "url": hugJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Give someone a hug"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to hug",
        "type": 6,
        "required": true,
    }
]