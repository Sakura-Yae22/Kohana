import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const blush = await fetch("https://shiro.gg/api/images/blush");
    const blushJSON = await blush.json();

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} blushed`,
            "color": 2717868,
            "image": {
                "url": blushJSON.url
            }
        }]
    }).catch(err => {});
}

export const description = "For those embarrassing moments"

export const category = "Emotions" 