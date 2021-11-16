import fetch from 'node-fetch'

export const commandLogic = async itemsToImport => {
    const { interaction } = itemsToImport;

    if(!interaction.channel.nsfw) return interaction.createMessage({"flags":64, "content": "This channel is not suitable NSFW content"}).catch(err => console.error("Cannot send messages to this channel", err));

    const hentai = await fetch('https://api.numselli.xyz/hentai/random');
    const hentaiJSON = await hentai.json();

    interaction.createMessage({
        "embeds": [{
            "title": `Hentai`,
            "url":hentaiJSON.url,
            "color": 2717868,
            "image": {
                "url": hentaiJSON.url
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "🔞 Sends a random NSFW hentai image"

export const category = "NSFW" 