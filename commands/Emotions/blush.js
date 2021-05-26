const fetch = require("node-fetch")
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message}=itemsToImport

        message.channel.createMessage( {
            "embed": {
                "title": `${message.author.username} blushed`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/blush").then(res => res.json())).url
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err))
    },
    "help":[
        {"name": "__Usage__","value": "For those embarrassing moments.\n```\n?PREFIX?blush\n```","inline": true}
    ]
}    