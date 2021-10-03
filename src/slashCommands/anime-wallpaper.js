module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;
    
    const wallpaper = await sharder.nekoslife.sfw.wallpaper();

    interaction.createMessage({"embeds": [{
    "title": "Wallpaper",
        "color": 2717868,
        "image": {
            "url": wallpaper.url
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a random anime wallpaper"

module.exports.category = "Anime" 