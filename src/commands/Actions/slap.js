const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant slap a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant slap your self.").catch(err => console.error("Cannot send messages to this channel", err));
        const slap = await fetch('https://purrbot.site/api/img/sfw/slap/gif');
        const slapJSON = await slap.json();

        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was slaped by ${message.author.username}`,
                "color": 2717868,
                "timestamp": new Date().toISOString(),
                "image": {
                    "url": slapJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Slap a user.\n```\n??botPrefix??slap <@user>\n```","inline": true}
    ]
};