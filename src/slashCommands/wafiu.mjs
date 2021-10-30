import nekosDotLife from "nekos.life";
const nekoslife = new nekosDotLife();

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const waifu = await nekoslife.sfw.waifu();

    interaction.createMessage({"embeds": [{
    "title": "Waifu",
        "color": 2717868,
        "image": {
            "url": waifu.url
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a random waifu image"

export const category = "Anime" 