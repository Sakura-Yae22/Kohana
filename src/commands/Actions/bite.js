const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        if (message.mentions.length !== 1) return  message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant bite a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant bite your self.").catch(err => console.error("Cannot send messages to this channel", err));

        const bite = await fetch('https://purrbot.site/api/img/sfw/bite/gif');
        const biteJSON = await bite.json();
        message.channel.createMessage({
            "embeds": {
                "title": `${message.mentions[0].username} was bitten by ${message.author.username}`,
                "color": 2717868,
                "image": {
                    "url": biteJSON.link
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Bite someone\n```\n??botPrefix??bite <@user>\n```","inline": true}
    ]
};