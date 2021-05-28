const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport

        const kitsune = await fetch('https://purrbot.site/api/img/sfw/kitsune/img')
        const kitsuneJSON = await kitsune.json()
        message.channel.createMessage({
            "embed": {
                "title": `KITSUNE`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": kitsuneJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Cute anime fox.\n```\n?PREFIX?kitsune \n```","inline": true}
    ]
}