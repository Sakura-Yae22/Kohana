const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const holo = await fetch('https://purrbot.site/api/img/sfw/tail/gif');
        const holoJSON = await holo.json();
        message.channel.createMessage({
            "embeds": {
                "title": `TAIL`,
                "color": 2717868,
                "image": {
                    "url": holoJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Wag your tail\n```\n??botPrefix??tail \n```","inline": true}
    ]
};