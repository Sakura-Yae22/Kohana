const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const nekosDotLife = require("nekos.life"), nekoslife = new nekosDotLife();

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const ranChance = Number((Math.random() * 1).toFixed(1));
    const nekosLifeRandChance = Number((Math.random() * 1).toFixed(1));
    
    const nekoJSON = (nekosLifeRandChance >= 0.5) ? await (await fetch(`https://purrbot.site/api/img/sfw/neko/${ranChance>=0.5 ? 'img' : 'gif'}`)).json() : await nekoslife.sfw.neko();

    interaction.createMessage({"embeds": [{
    "title": "NEKO",
        "color": 2717868,
        "image": {
            "url": nekoJSON[nekosLifeRandChance >= 0.5 ? "link" : "url"]
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a random neko image"

module.exports.category = "Anime" 