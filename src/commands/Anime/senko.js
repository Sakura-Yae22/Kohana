const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const senko = await fetch('https://purrbot.site/api/img/sfw/senko/img');
        const senkoJSON = await senko.json();
        message.channel.createMessage({
            "embeds": {
                "title": `SENKO`,
                "color": 2717868,
                "image": {
                    "url": senkoJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Show an image of The Helpful Fox Senko-san.\n```\n??botPrefix??senko \n```","inline": true}
    ]
};