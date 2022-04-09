import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const holo = await fetch('https://purrbot.site/api/img/sfw/holo/img');
    const holoJSON = await holo.json();
    interaction.createMessage({
        "embeds": [
            {
                "title": `HOLO`,
                "color": 2717868,
                "image": {
                    "url": holoJSON.link
                }
            }
        ]
    }).catch(err => {});
}

export const description = "Get an image of Holo"

export const category = "Anime" 