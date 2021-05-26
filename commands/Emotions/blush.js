const fetch = require("node-fetch")
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage}=itemsToImport

        sendMessage(message.channel.id, {
            "embed": {
                "title": `${message.author.username} blushed`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/blush").then(res => res.json())).url
                }
            }
        })
    },
    "help":[
        {"name": "__Usage__","value": "For those embarrassing moments.\n```\n?PREFIX?blush\n```","inline": true}
    ]
}    