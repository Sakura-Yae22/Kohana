// enter a sub name 
// .setTitle(`a random image from r/${Subreddit}`)
// .setColor(`RANDOM`)
// .setImage(img)
// .setURL(`https://reddit.com/r/${Subreddit}`)
// image is random post from sub

const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;
        const splitMessage = message.content.split(" ")

        const reddit = await fetch(`https://api.reddit.com/r/${splitMessage[0].toLowerCase() ?? "all"}/${splitMessage[1].toLowerCase() ?? "top"}?limit=1`);
        const redditJSON = await reddit.json();

        message.channel.createMessage(
            {
                "embed": {
                  "title": `${splitMessage[1].charAt(0).toUpperCase()}${splitMessage[1].slice(1)} post from r/${splitMessage[0]}`,
                  "url": `https://reddit.com${redditJSON.data.children[0].data.permalink}`,
                  "description": redditJSON.data.children[0].data.selftext,
                  "color": 2717868,
                  "footer": {
                    "text": `👍 ${redditJSON.data.children[0].data.score} • ${redditJSON.data.children[0].data.author}`
                  },
                  "image": {
                    "url": redditJSON.data.children[0].data.url
                  }
                }
              }
        ).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Sometimes you just nyeed to owoify youw speech.\n```\n??botPrefix??help <command>\n```","inline": true}
    ]
};