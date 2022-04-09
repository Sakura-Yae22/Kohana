import fetch from "node-fetch"

export const commandLogic = async interaction => {
    const fox = await fetch("https://nekos.life/api/v2/img/fox_girl");
    const foxJSON = await fox.json()

    interaction.createMessage( {
        "embeds": [{
            "title": `Fox-girl`,
            "color": 2717868,
            "image": {
                "url": foxJSON.url
            }
        }]
    }).catch(err => {});
}

export const description = "Shows a random fox-girl image"

export const category = "Anime"
