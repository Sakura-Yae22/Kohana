import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => {});
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant cuddle yourself."}).catch(err => {});

    const cuddle = await (await fetch('https://purrbot.site/api/img/sfw/cuddle/gif')).json()
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was cuddled by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": cuddle.link
            }
        }]
    }).catch(err => {});
}
 
export const description = "Cuddle someone"

export const options = [
    {
        "name": "user",
        "description": "The user to cuddle",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 
