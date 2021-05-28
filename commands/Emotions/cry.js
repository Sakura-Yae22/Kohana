const fetch = require("node-fetch")
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message}=itemsToImport
        
        message.channel.createMessage( {
            "embed": {
                "title": `${message.author.username} cried`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await fetch("https://shiro.gg/api/images/cry").then(res => res.json())).url
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Sometimes you just need to cry.\n```\n?PREFIX?cry\n```","inline": true}
    ]
}