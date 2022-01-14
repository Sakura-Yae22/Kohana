import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant punch yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const punch = await fetch('https://anime-api.hisoka17.repl.co/img/punch');
    const punchJSON = await punch.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was punched by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": punchJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Punch a user"

export const options = [
    {
        "name": "user", 
        "description": "The user to Punch",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions"