export const commandLogic = async interaction => {
    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => {});
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant bite yourself."}).catch(err => {});

    const bite = await fetch('https://purrbot.site/api/img/sfw/bite/gif');
    const biteJSON = await bite.json();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was bitten by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": biteJSON.link
            }
        }]
    }).catch(err => {});
}

export const description = "Bite someone"

export const options = [
    {
        "name": "user",
        "description": "The user to bite",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 