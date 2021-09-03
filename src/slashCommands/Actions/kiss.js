const fetch = import('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant kiss yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const kiss = await fetch((nekosLifeRandChance >= 0.5) ? 'https://purrbot.site/api/img/sfw/kiss/gif' : "https://anime-api.hisoka17.repl.co/img/kiss");
    const kissJSON = await kiss.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users[mentionedUserID].username} was kissed by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": kissJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Kiss someone special to you"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to kiss",
        "type": 6,
        "required": true,
    }
]