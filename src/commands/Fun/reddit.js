const fetch = require('node-fetch');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;
        const splitMessage = message.content.split(" ")

        const aboutSub = await fetch(`https://api.reddit.com/r/${splitMessage[0].toLowerCase()}/about`);
        const aboutSubJSON = await aboutSub.json();
        if (aboutSubJSON.message === "Not Found") return message.channel.createMessage({"embeds": {"title": `Error`,"description": 'This subreddit cant be found.',"color": 2717868}}).catch(err => console.error("Cannot send messages to this channel", err));
        if (aboutSubJSON.data.over_18 && !message.channel.nsfw) return message.channel.createMessage({"embeds": {"title": `Error`,"description": 'This subreddit is marked 18+ and this channel is not suitable for such content.',"color": 2717868}}).catch(err => console.error("Cannot send messages to this channel", err));

        const reddit = await fetch(`https://api.reddit.com/r/${splitMessage[0].toLowerCase()}/${splitMessage[1]?.toLowerCase() ?? "top"}?limit=1`);
        const redditJSON = await reddit.json();
        if (redditJSON.data.children[0].data.over_18 && !message.channel.nsfw) return message.channel.createMessage({"embeds": {"title": `Error`,"description": 'This post is marked 18+ and this channel is not suitable for such content.',"color": 2717868}}).catch(err => console.error("Cannot send messages to this channel", err));

        message.channel.createMessage(
            {
                "embeds": {
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
        {"name": "__Usage__","value": "Show the top post from a sub reddit.\n```\n??botPrefix??reddit <subreddit> <sort (best, hot, new, random)>\n```","inline": true}
    ]
};