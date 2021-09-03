const fetch = import('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const smile = await fetch('https://purrbot.site/api/img/sfw/smile/gif');
    const smileJSON = await smile.json();


    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} smiled`,
            "color": 2717868,
            "image": {
                "url": smileJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Smile once in a while"
