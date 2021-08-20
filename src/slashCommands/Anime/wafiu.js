module.exports.commandLogic = async itemsToImport => {
    const {message, sharder} = itemsToImport;

    const waifu = await sharder.nekoslife.sfw.waifu();

    message.channel.createMessage({"embeds": {
    "title": "Waifu",
        "color": 2717868,
        "image": {
            "url": waifu.url
        }
    }}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a random waifu image"