import fetch from 'node-fetch'

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const factJSON = await fact.json();
    
    interaction.createMessage( {"embeds": [{"title": "Random Fact:","description": factJSON.text,"url":factJSON.permalink,"color": 2717868,"footer": {"text": `Fact id: ${factJSON.id}`}}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Get a random fact"

export const category = "Fun" 