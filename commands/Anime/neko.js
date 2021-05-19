module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, nekolife}=itemsToImport

        const ranChance = Math.floor(Math.random() * 100) + 1;
        sendMessage(message.channel.id, {
            "embed": {
                "title": "NEKO",
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": ranChance>=50 ? (await nekolife.sfw.neko()).url : (await nekolife.sfw.nekoGif()).url
                }
            }
        })
    },
    "help":[
        {"name": "__Usage__","value": "Shows a random neko image.\n```\n?PREFIX?neko\n```","inline": true}
    ]
}