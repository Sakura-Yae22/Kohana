const fetch = require("node-fetch");

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const blush = await fetch("https://shiro.gg/api/images/blush");
    const blushJSON = await blush.json();

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.user.username} blushed`,
            "color": 2717868,
            "image": {
                "url": blushJSON.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "For those embarrassing moments"