const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;
        const fact = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
        const factJSON = await fact.json();
        
        message.channel.createMessage( {"embed": {"title": "Random Fact:","description": factJSON.text,"url":factJSON.permalink,"color": 2717868,"timestamp": new Date().toISOString(),"footer": {"text": `Fact id: ${factJSON.id}`}}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Lists all commands\n ```\n?PREFIX?help\n```\nGives information about a specific command.\n```\n?PREFIX?help <command>\n```","inline": true}
    ]
};