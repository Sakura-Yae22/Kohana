import nekosDotLife from "nekos.life";
const nekoslife = new nekosDotLife();

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;
    
    const wallpaper = await nekoslife.sfw.wallpaper();

    interaction.createMessage({"embeds": [{
    "title": "Wallpaper",
        "color": 2717868,
        "image": {
            "url": wallpaper.url
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a random anime wallpaper"

export const category = "Anime" 