import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant kiss yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const kiss = await fetch((ranChance >= 0.5) ? 'https://purrbot.site/api/img/sfw/kiss/gif' : "https://anime-api.hisoka17.repl.co/img/kiss");
    const kissJSON = await kiss.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was kissed by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": kissJSON[ranChance >= 0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Kiss someone special to you"

export const options = [
    {
        "name": "user",
        "description": "The user to kiss",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 