const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const dance = await fetch('https://purrbot.site/api/img/sfw/dance/gif');
        const danceJSON = await dance.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} showed off some moves.`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": danceJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Show off some cool dance moves.\n```\n??botPrefix??dance\n```","inline": true}
    ]
};