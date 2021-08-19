module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;

        const nekoJSON = await sharder.nekoslife.sfw.waifu();

        message.channel.createMessage({"embeds": {
        "title": "Waifu",
            "color": 2717868,
            "image": {
                "url": nekoJSON.url
            }
        }}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a random waifu image.\n```\n??botPrefix??wafiu\n```","inline": true}
    ]
};