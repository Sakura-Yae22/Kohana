const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant poke yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const poke = await fetch('https://purrbot.site/api/img/sfw/poke/gif');
    const pokeJSON = await poke.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users[mentionedUserID].username} was poked by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": pokeJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Poke a user"

module.exports.options = [
    {
        "name": "user", 
        "description": "The user to poke",
        "type": 6,
        "required": true,
    }
]