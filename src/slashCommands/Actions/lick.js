const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === message.author.id) return interaction.createMessage({"flags":64, "content": "You cant lick yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const lick = await fetch('https://purrbot.site/api/img/sfw/lick/gif');
    const lickJSON = await lick.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${message.mentions[0].username} was licked by ${message.author.username}`,
            "color": 2717868,
            "image": {
                "url": lickJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}
 
module.exports.description = "Lick a user"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to lick",
        "type": 6,
        "required": true,
    }
]