export const commandLogic = async interaction => {
    const kitsune = await fetch('https://purrbot.site/api/img/sfw/kitsune/img');
    const kitsuneJSON = await kitsune.json();
    interaction.createMessage({
        "embeds": [{
            "title": `KITSUNE`,
            "color": 2717868,
            "image": {
                "url": kitsuneJSON.link
            }
        }]
    }).catch(err => {});
}

export const description = "Cute anime fox";

export const category = "Anime" 