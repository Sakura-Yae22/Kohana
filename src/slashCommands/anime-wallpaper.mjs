import fetch from 'node-fetch'

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;
    
    const wall = await fetch('https://wallhaven.cc/api/v1/search?categories=010&sorting=random')
    const wallJSON = await wall.json()

    wallJSON.data[Math.floor(Math.random() * wallJSON.data.length)].path
   
    interaction.createMessage({"embeds": [{
    "title": "Wallpaper",
        "color": 2717868,
        "image": {
            "url": wallJSON.data[Math.floor(Math.random() * wallJSON.data.length)].path
        }
    }]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a random anime wallpaper"

export const category = "Anime" 