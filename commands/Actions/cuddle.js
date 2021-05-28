const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport

        if (message.mentions.length !== 1) return  message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant cuddle a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cuddle your self.").catch(err => console.error("Cannot send messages to this channel", err));

        const cuddle = await fetch('https://purrbot.site/api/img/sfw/cuddle/gif')
        const cuddleJSON = await cuddle.json()
        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was cuddled by ${message.author.username}`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": cuddleJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Cuddle someone\n```\n?PREFIX?cuddle <@user>\n```","inline": true}
    ]
}