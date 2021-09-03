const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant slap yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const slap = await fetch('https://purrbot.site/api/img/sfw/slap/gif');
    const slapJSON = await slap.json();

    interaction.createMessage({
        "embeds":[ {
            "title": `${interaction.data.resolved.users[mentionedUserID].username} was slaped by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": slapJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Slap a user"

module.exports.options = [
    {
        "name": "user", 
        "description": "The user to slap",
        "type": 6,
        "required": true,
    },
]