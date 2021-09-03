const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.commandLogic = async itemsToImport => {
  const { interaction } = itemsToImport;

  const sub = interaction.data.options[0].value
  const subreddit = sub.toLowerCase().includes("r/") ? sub : `r/${sub}`;
  const sort = interaction.data.options[1]?.value ?? "top" 

  const aboutSub = await fetch(`https://api.reddit.com/${subreddit}/about`);
  const aboutSubJSON = await aboutSub.json();
  if (aboutSubJSON.message === "Not Found") return interaction.createMessage({"flags":64, "embeds": [{ "title": `Error`, "description": 'This subreddit cant be found.', "color": 2717868 }] }).catch(err => console.error("Cannot send messages to this channel", err));
  if (aboutSubJSON.data.over_18 && !interaction.member.guild.channels.get(interaction.channelID).nsfw) return interaction.createMessage({"flags":64, "embeds": [{"title": `Error`,"description": 'This subreddit is marked 18+ and this channel is not suitable for such content.',"color": 2717868}]}).catch(err => console.error("Cannot send messages to this channel", err));

  const reddit = await fetch(`https://api.reddit.com/${subreddit}/${sort}?limit=1`);
  const redditJSON = await reddit.json();
  if (redditJSON.data.children[0].data.over_18 && !interaction.member.guild.channels.get(interaction.channelID).nsfw) return interaction.createMessage({"flags":64, "embeds": [{"title": `Error`,"description": 'This post is marked 18+ and this channel is not suitable for such content.',"color": 2717868}]}).catch(err => console.error("Cannot send messages to this channel", err));

  interaction.createMessage(
    {
      "embeds": [
        {
          "title": `${sort.charAt(0).toUpperCase()}${sort.slice(1)} post from ${subreddit}`,
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
      ]
    }
  ).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a post from a subreddit"

module.exports.options = [
  {
    "name": "subreddit",
    "description": "The Reddit comunity to get a post from",
    "type": 3,
    "required": true,
  },
  {
    "name": "sort",
    "description": "The way you want to sort the post",
    "type": 3,
    "required": false,
    "choices": [
      {
        "name": "Hot",
        "value": "hot"
      },
      {
        "name": "New",
        "value": "new"
      },
      {
        "name": "Rising",
        "value": "rising"
      }
    ]
  }
]