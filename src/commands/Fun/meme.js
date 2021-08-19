const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;

        const subs = ["memes", "meme", "dankmemes"]
        const meme = await fetch(`https://api.reddit.com/r/${subs[Math.floor((Math.random() * subs.length-1) + 1)]}/random`);
        const memeJSON = await meme.json();

        message.channel.createMessage(
            {
                "embeds": {
                  "title": memeJSON[0].data.children[0].data.title,
                  "url": `https://reddit.com${memeJSON[0].data.children[0].data.permalink}`,
                  "color": 2717868,
                  "footer": {
                    "text": `👍 ${memeJSON[0].data.children[0].data.score} • ${memeJSON[0].data.children[0].data.author}  • ${memeJSON[0].data.children[0].data.subreddit_name_prefixed}`
                  },
                  "image": {
                    "url": memeJSON[0].data.children[0].data.url
                  }
                }
              }
        ).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Gets a random meme from reddit.\n```\n??botPrefix??meme\n```","inline": true}
    ]
};