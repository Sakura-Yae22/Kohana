import {query} from '../utils/database.mjs'

export const commandLogic = async itemsToImport => {
    const {interaction, bot} = itemsToImport;    

    const embeds = {
        "embeds": [
            {
                "title": "Info",
                "color": 5747894,
                "fields": [
                    {
                        "name": "Bot",
                        "value": `**Shard Ping: ** ${interaction.member.guild.shard.latency} MS\n**Uptime: **${(Math.floor(bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,
                        "inline": false
                    },
                    {
                        "name": `Creator`,
                        "value": `[numselli#6964](https://numselli.xyz)`,
                        "inline": false
                    }
                ]
            }
        ],
        "components": [
            {
                "type": 1, 
                "components": (await query({text: 'SELECT name as label, value as url FROM links', values: []})).map(({label, url})=>{return {"type": 2, "style": 5, label, url}})
            }
        ]
    };
    
    interaction.createMessage(embeds).catch(err => console.error("Cannot send messages to this channel", err));        
}

export const description = "Shows info about the bot"

export const category = "Info"