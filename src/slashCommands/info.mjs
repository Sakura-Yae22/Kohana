export const commandLogic = async itemsToImport => {
    const {interaction, bot} = itemsToImport;    
    
    interaction.createMessage({
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
        ]
    }).catch(err => console.error("Cannot send messages to this channel", err));        
}

export const description = "Shows info about the bot"

export const category = "Info"