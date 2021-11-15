import fetch from "node-fetch"

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const waifu = await fetch("https://nekos.life/api/v2/img/waifu");
    const waifuJSON = await waifu.json()

    interaction.createMessage({"embeds": [{
    "title": "Waifu",
        "color": 2717868,
        "image": {
            "url": waifuJSON.url
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a random waifu image"

export const category = "Anime"