const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant kill yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const kill = await fetch('https://anime-api.hisoka17.repl.co/img/kill');
    const killJSON = await kill.json();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was killed by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": killJSON.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Kill someone"

export const options = [
    {
        "name": "user",
        "description": "The user to kill",
        "type": 6,
        "required": true,
    }
]

export const category = "Actions" 