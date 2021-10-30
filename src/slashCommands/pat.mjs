import fetch from 'node-fetch'
import nekosDotLife from "nekos.life";
const nekoslife = new nekosDotLife();

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant pat yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const pat = ranChance>=0.5 ? await (await fetch('https://purrbot.site/api/img/sfw/pat/gif')).json() : await nekoslife.sfw.pat();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was patted by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": pat[ranChance>=0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
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