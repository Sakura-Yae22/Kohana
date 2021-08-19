const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;
        const fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const factJSON = await fact.json();
        
        message.channel.createMessage( {"embeds": {"title": "Random Fact:","description": factJSON.text,"url":factJSON.permalink,"color": 2717868,"footer": {"text": `Fact id: ${factJSON.id}`}}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Get a random fact\n ```\n??botPrefix??fact\n```","inline": true}
    ]
};