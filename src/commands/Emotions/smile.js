const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const smile = await fetch('https://purrbot.site/api/img/sfw/smile/gif');
        const smileJSON = await smile.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} smiled`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": smileJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Smile once in a while.\n```\n??botPrefix??smile\n```","inline": true}
    ]
};