const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return  message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant hug a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant hug your self.").catch(err => console.error("Cannot send messages to this channel", err));
        
        const hug = await fetch((nekosLifeRandChance >= 0.5) ? 'https://purrbot.site/api/img/sfw/hug/gif' : "https://anime-api.hisoka17.repl.co/img/hug");
        const hugJSON = await hug.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was hugged by ${message.author.username}`,
                "color": 2717868,
                "image": {
                    "url": hugJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Give someone a hug\n```\n??botPrefix??hug <@user>\n```","inline": true}
    ]
};