const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant pat yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const pat = ranChance>=0.5 ? await (await fetch('https://purrbot.site/api/img/sfw/pat/gif')).json() : await sharder.nekoslife.sfw.pat();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was patted by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": pat[ranChance>=0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Pat someone on the head"

module.exports.options = [
    {
        "name": "user", 
        "description": "The user to pat",
        "type": 6,
        "required": true,
    }
]

module.exports.category = "Actions" 