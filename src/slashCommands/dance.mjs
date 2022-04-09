import fetch from 'node-fetch'
export const commandLogic = async interaction => {
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
    }).catch(err => {});
}

export const description = "Show off some cool dance moves"

export const category = "Actions" 