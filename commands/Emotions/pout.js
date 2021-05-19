module.exports = {
    "commandLogic": async function pout(itemsToImport) {
        let {message, sendMessage} = itemsToImport

        const fetch = require("node-fetch")
        sendMessage(message.channel.id, {
            "embed": {
                "title": `${message.author.username} pouted`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/pout").then(res => res.json())).url
                }
            }
        })
    },
    "help":[
        {"name": "__Usage__","value": "It's ok to pout sometimes.\n```\n?PREFIX?pout\n```","inline": true}
    ]
}