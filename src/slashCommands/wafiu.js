const nekosDotLife = require("nekos.life"), nekoslife = new nekosDotLife();

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const waifu = await nekoslife.sfw.waifu();

    interaction.createMessage({"embeds": [{
    "title": "Waifu",
        "color": 2717868,
        "image": {
            "url": waifu.url
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a random waifu image"

module.exports.category = "Anime" 