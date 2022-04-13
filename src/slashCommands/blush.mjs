import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const blush = await fetch("https://nekos.best/api/v2/blush");
    const blushJSON = await blush.json();

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} blushed`,
            "color": 2717868,
            "image": {
                "url": blushJSON.results[0].url
            }
        }]
    }).catch(err => {});
}

export const description = "For those embarrassing moments"

export const category = "Emotions" 