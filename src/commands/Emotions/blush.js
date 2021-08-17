const fetch = require("node-fetch");
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        message.channel.createMessage( {
            "embed": {
                "title": `${message.author.username} blushed`,
                "color": 2717868,
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/blush").then(res => res.json())).url
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "For those embarrassing moments.\n```\n??botPrefix??blush\n```","inline": true}
    ]
};  