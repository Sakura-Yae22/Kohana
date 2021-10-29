const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const pout = await fetch("https://shiro.gg/api/images/cry");
    const poutJSON = await pout.json()

    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} pouted`,
            "color": 2717868,
            "image": {
                "url": poutJSON.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "It's ok to pout sometimes"

export const category = "Emotions" 