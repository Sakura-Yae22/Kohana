const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message}=itemsToImport

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant pat a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant pat your self.").catch(err => console.error("Cannot send messages to this channel", err));
        const pat = await fetch('https://purrbot.site/api/img/sfw/pat/gif')
        const patJSON = await pat.json()

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was patted by ${message.author.username}`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": patJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Pat someone on the head.\n```\n?PREFIX?pat <@user>\n```","inline": true}
    ]
}