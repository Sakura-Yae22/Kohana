const fetch = require("node-fetch");
module.exports = {
    "commandLogic": async function pout(itemsToImport) {
        const {message} = itemsToImport;

        message.channel.createMessage( {
            "embed": {
                "title": `${message.author.username} pouted`,
                "color": 2717868,
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/pout").then(res => res.json())).url
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "It's ok to pout sometimes.\n```\n??botPrefix??pout\n```","inline": true}
    ]
};