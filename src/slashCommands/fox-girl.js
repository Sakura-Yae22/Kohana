module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    const fox = await sharder.nekoslife.sfw.foxGirl();

    interaction.createMessage( {
        "embeds": [{
            "title": `Fox-girl`,
            "color": 2717868,
            "image": {
                "url": fox.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a random fox-girl image"

module.exports.category = "Anime"