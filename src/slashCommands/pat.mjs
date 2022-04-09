import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => {});
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant pat yourself."}).catch(err => {});

    const pat = await (await fetch('https://purrbot.site/api/img/sfw/pat/gif')).json()

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was patted by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": pat.link
            }
        }]
    }).catch(err => {});
}

export const description = "Pat someone on the head"

export const options = [
    {
        "name": "user", 
        "description": "The user to pat",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 
