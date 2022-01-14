import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant lick yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const lick = await fetch('https://purrbot.site/api/img/sfw/lick/gif');
    const lickJSON = await lick.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was licked by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": lickJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}
 
export const description = "Lick a user"

export const options = [
    {
        "name": "user",
        "description": "The user to lick",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 