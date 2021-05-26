const nekoslife = require("nekos.life"), nekolife = new nekoslife()
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message}=itemsToImport

        const ranChance = Math.floor(Math.random() * 100) + 1;
        message.channel.createMessage({
        "title": "NEKO",
            "color": 2717868,
            "timestamp": new Date().toISOString(),
            "image": {
                "url": ranChance>=50 ? (await nekolife.sfw.neko()).url : (await nekolife.sfw.nekoGif()).url
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a random neko image.\n```\n?PREFIX?neko\n```","inline": true}
    ]
}