import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    if(!interaction.channel.nsfw) return interaction.createMessage({"flags":64, "content": "This channel is not suitable NSFW content"}).catch(err => {});

    const hentai = await fetch('https://hentaiapi.numselli.xyz/api/hentai/random');
    const hentaiJSON = await hentai.json();

    interaction.createMessage({
        "embeds": [{
            "title": `Hentai`,
            "url":hentaiJSON.url,
            "color": 2717868,
            "image": {
                "url": hentaiJSON.url
            }
        }],
        "components": [{
            "type": 1,
            "components": [
                {"type": 2, "style": 5, "label": "Report", "url": hentaiJSON.reportUrl}
            ]
        }]
    }).catch(err => {});
}

export const description = "🔞 Sends a random NSFW hentai image"

export const category = "NSFW" 