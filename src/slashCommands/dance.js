const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const dance = await fetch('https://purrbot.site/api/img/sfw/dance/gif');
    const danceJSON = await dance.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.member.user.username} showed off some moves.`,
            "color": 2717868,
            "image": {
                "url": danceJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Show off some cool dance moves"

module.exports.category = "Actions" 