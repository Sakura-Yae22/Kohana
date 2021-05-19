module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const fetch = require("node-fetch")
        let {message, sendMessage}=itemsToImport
        
        sendMessage(message.channel.id, {
            "embed": {
                "title": `${message.author.username} cried`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/cry").then(res => res.json())).url
                }
            }
        })
    },
    "help":[
        {"name": "__Usage__","value": "Sometimes you just need to cry.\n```\n?PREFIX?cry\n```","inline": true}
    ]
}