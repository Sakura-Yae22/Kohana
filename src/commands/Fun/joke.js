const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;
        const joke = await fetch('https://official-joke-api.appspot.com/random_joke');
        const jokeJSON = await joke.json();

        message.channel.createMessage( {"embeds": {"title": jokeJSON.setup,"description": jokeJSON.punchline,"color": 2717868}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Get a random joke\n ```\n??botPrefix??joke\n```","inline": true}
    ]
};