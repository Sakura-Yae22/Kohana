const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant tickle a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant tickle your self.").catch(err => console.error("Cannot send messages to this channel", err));
        const tickle = await fetch('https://purrbot.site/api/img/sfw/tickle/gif');
        const tickleJSON = await tickle.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was tickled by ${message.author.username}`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": tickleJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Tickle someone.\n```\n??botPrefix??tickle <@user>\n```","inline": true}
    ]
};