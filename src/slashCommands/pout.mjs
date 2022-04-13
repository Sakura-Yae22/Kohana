import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const pout = await fetch("https://nekos.best/api/v2/cry");
    const poutJSON = await pout.json()

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} pouted`,
            "color": 2717868,
            "image": {
                "url": poutJSON.results[0].url
            }
        }]
    }).catch(err => {});
}

export const description = "It's ok to pout sometimes"

export const category = "Emotions" 