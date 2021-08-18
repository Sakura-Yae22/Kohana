const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;

        const ranChance = Number((Math.random() * 1).toFixed(1));
        const nekosLifeRandChance = Number((Math.random() * 1).toFixed(1));

        const neko = await fetch(`https://purrbot.site/api/img/sfw/neko/${ranChance>=0.5 ? 'img' : 'gif'}`);

        const nekoJSON = (nekosLifeRandChance >= 0.5) ? await neko.json() : await sharder.nekoslife.sfw.neko();

        message.channel.createMessage({"embed": {
        "title": "NEKO",
            "color": 2717868,
            "image": {
                "url": nekoJSON[nekosLifeRandChance >= 0.5 ? "link" : "url"]
            }
        }}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a random neko image.\n```\n??botPrefix??neko\n```","inline": true}
    ]
};