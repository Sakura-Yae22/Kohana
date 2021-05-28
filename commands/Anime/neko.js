const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message}=itemsToImport

        const ranChance = Math.floor(Math.random() * 100) + 1;

        const neko = await fetch(`https://purrbot.site/api/img/sfw/neko/${ranChance>=50 ? 'img' : 'gif'}`)
        const nekoJSON = await neko.json()

        message.channel.createMessage({"embed": {
        "title": "NEKO",
            "color": 2717868,
            "timestamp": new Date().toISOString(),
            "image": {
                "url": nekoJSON.link
            }
        }}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a random neko image.\n```\n?PREFIX?neko\n```","inline": true}
    ]
}