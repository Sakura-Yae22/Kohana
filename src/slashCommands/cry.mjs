import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const cry = await fetch("https://nekos.best/api/v2/cry");
    const cryJSON = await cry.json()

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} cried`,
            "color": 2717868,
            "image": {
                "url": cryJSON.restults[0].url
            }
        }]
    }).catch(err => {});
}

export const description = "Sometimes you just need to cry"

export const category = "Emotions" 