const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const advice = await fetch('https://api.adviceslip.com/advice');
    const adviceJSON = await advice.json();

    interaction.createMessage({"embeds": [{"title": "Advice:","description": adviceJSON.slip.advice,"color": 2717868}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Some random advice"