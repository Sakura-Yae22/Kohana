export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => {});
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant slap yourself."}).catch(err => {});

    const slap = await fetch('https://purrbot.site/api/img/sfw/slap/gif');
    const slapJSON = await slap.json();

    interaction.createMessage({
        "embeds":[ {
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was slaped by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": slapJSON.link
            }
        }]
    }).catch(err => {});
}

export const description = "Slap a user"

export const options = [
    {
        "name": "user", 
        "description": "The user to slap",
        "type": 6,
        "required": true,
    },
]

export const category = "Actions" 