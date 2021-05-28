const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport

        const holo = await fetch('https://purrbot.site/api/img/sfw/holo/img')
        const holoJSON = await holo.json()
        message.channel.createMessage({
            "embed": {
                "title": `HOLO`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": holoJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Get an image of Holo\n```\n?PREFIX?holo\n```","inline": true}
    ]
}