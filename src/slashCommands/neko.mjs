import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const ranChance = Number((Math.random() * 1).toFixed(1));    
    const nekoJSON = await (await fetch(`https://purrbot.site/api/img/sfw/neko/${ranChance>=0.5 ? 'img' : 'gif'}`)).json()

    interaction.createMessage({"embeds": [{
    "title": "NEKO",
        "color": 2717868,
        "image": {
            "url": nekoJSON.link
        }
    }]}).catch(err => {});
}

export const description = "Shows a random neko image"

export const category = "Anime" 
