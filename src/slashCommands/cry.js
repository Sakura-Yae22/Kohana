import fetch from 'node-fetch'

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const cry = await fetch("https://shiro.gg/api/images/cry");
    const cryJSON = await cry.json()

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} cried`,
            "color": 2717868,
            "image": {
                "url": cryJSON.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Sometimes you just need to cry"

export const category = "Emotions" 