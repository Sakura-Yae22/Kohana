
const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant poke a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant poke your self.").catch(err => console.error("Cannot send messages to this channel", err));
        const poke = await fetch('https://purrbot.site/api/img/sfw/poke/gif');
        const pokeJSON = await poke.json();

        message.channel.createMessage({
            "embeds": {
                "title": `${message.mentions[0].username} was poked by ${message.author.username}`,
                "color": 2717868,
                "image": {
                    "url": pokeJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Poke a user.\n```\n??botPrefix??poke <@user>\n```","inline": true}
    ]
};