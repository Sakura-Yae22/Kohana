const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const senko = await fetch('https://purrbot.site/api/img/sfw/senko/img');
    const senkoJSON = await senko.json();
    interaction.createMessage([{
        "embeds": {
            "title": `SENKO`,
            "color": 2717868,
            "image": {
                "url": senkoJSON.link
            }
        }
    }]).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Show an image of The Helpful Fox Senko-san"

export const category = "Anime" 