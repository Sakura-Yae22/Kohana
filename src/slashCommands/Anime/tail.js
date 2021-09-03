const fetch = import('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const tail = await fetch('https://purrbot.site/api/img/sfw/tail/gif');
    const tailJSON = await tail.json();
    interaction.createMessage({
        "embeds": [{
            "title": `TAIL`,
            "color": 2717868,
            "image": {
                "url": tailJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Wag your tail"