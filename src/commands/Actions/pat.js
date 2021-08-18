const fetch = require('node-fetch');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;

        if (message.mentions.length !== 1) return message.channel.createMessage("Please mention a user.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].bot) return  message.channel.createMessage("You cant pat a bot.").catch(err => console.error("Cannot send messages to this channel", err));
        if (message.mentions[0].id === message.author.id) return  message.channel.createMessage("You cant pat your self.").catch(err => console.error("Cannot send messages to this channel", err));
        
        const ranChance = Number((Math.random() * 1).toFixed(1));

        const pat = ranChance>=0.5 ? await (await fetch('https://purrbot.site/api/img/sfw/pat/gif')).json() : await sharder.nekoslife.sfw.pat();
        
        message.channel.createMessage({
            "embed": {
                "title": `${message.mentions[0].username} was patted by ${message.author.username}`,
                "color": 2717868,
                "image": {
                    "url": pat[ranChance>=0.5 ? "link" : "url"]
                }
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Pat someone on the head.\n```\n??botPrefix??pat <@user>\n```","inline": true}
    ]
};