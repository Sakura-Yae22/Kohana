const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const nekosDotLife = require("nekos.life"), nekoslife = new nekosDotLife();

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant cuddle yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const cuddle = ranChance>=0.5 ? await (await fetch('https://purrbot.site/api/img/sfw/cuddle/gif')).json() : await nekoslife.sfw.cuddle();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was cuddled by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": cuddle[ranChance>=0.5 ? "link" : "url"]
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}
 
module.exports.description = "Cuddle someone"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to cuddle",
        "type": 6,
        "required": true,
    }
]

module.exports.category = "Actions" 