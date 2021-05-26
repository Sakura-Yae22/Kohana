module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, nekolife}=itemsToImport

        if (message.mentions.length !== 1) return sendMessage(message.channel.id, "Please mention a user.")
        sendMessage(message.channel.id, {
            "embed": {
                "title": `${message.mentions[0].username} was patted by ${message.author.username}`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": (await nekolife.sfw.pat()).url
                }
            }
        })
    },
    "help":[
        {"name": "__Usage__","value": "Pat someone on the head.\n```\n?PREFIX?pat <@user>\n```","inline": true}
    ]
}