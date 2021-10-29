const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

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
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "For those embarrassing moments"

export const category = "Emotions" 