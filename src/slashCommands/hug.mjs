import fetch from 'node-fetch'
export const commandLogic = async interaction => {
    
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => {});
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant hug yourself."}).catch(err => {});
    
    const ranChance = Number((Math.random() * 1).toFixed(1));
    const hug = await fetch((ranChance >= 0.5) ? 'https://purrbot.site/api/img/sfw/hug/gif' : "https://anime-api.hisoka17.repl.co/img/hug");
    const hugJSON = await hug.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was hugged by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": hugJSON[ranChance >= 0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => {});
}

export const description = "Give someone a hug"

export const options = [
    {
        "name": "user",
        "description": "The user to hug",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 