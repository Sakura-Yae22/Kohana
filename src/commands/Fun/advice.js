const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;

        const advice = await fetch('https://api.adviceslip.com/advice');
        const adviceJSON = await advice.json();

        message.channel.createMessage({"embeds": {"title": "Advice:","description": adviceJSON.slip.advice,"color": 2717868}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Some random advice.\n```\n??botPrefix??advice\n```","inline": true}
    ]
};