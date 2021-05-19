const fetch = require('node-fetch')

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, randomColor} = itemsToImport
        fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(res => res.json())
        .then(async body => {
            sendMessage(message.channel.id, {"embed": {"title": "Random Fact:","description": body.text,"url":body.permalink,"color": await randomColor(),"timestamp": new Date().toISOString(),"footer": {"text": `Fact id: ${body.id}`}}})
        });
    },
    "help":[
        {"name": "__Usage__","value": "Lists all commands\n ```\n?PREFIX?help\n```\nGives information about a specific command.\n```\n?PREFIX?help <command>\n```","inline": true}
    ]
}