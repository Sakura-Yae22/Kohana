const fetch = require("node-fetch")
module.exports = {
    "commandLogic": async function pout(itemsToImport) {
        let {message} = itemsToImport

        message.channel.createMessage( {
            "embed": {
                "title": `${message.author.username} pouted`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/pout").then(res => res.json())).url
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "It's ok to pout sometimes.\n```\n?PREFIX?pout\n```","inline": true}
    ]
}