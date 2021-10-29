const nekosDotLife = require("nekos.life"), nekoslife = new nekosDotLife();

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const fox = await nekoslife.sfw.foxGirl();

    interaction.createMessage( {
        "embeds": [{
            "title": `Fox-girl`,
            "color": 2717868,
            "image": {
                "url": fox.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a random fox-girl image"

export const category = "Anime"