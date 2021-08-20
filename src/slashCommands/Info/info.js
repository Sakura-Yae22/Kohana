module.exports.commandLogic = async itemsToImport => {
    const {sharder, interaction} = itemsToImport;

    const embeds = {
        "embeds": [
            {
                "title": "Info",
                "color": 5747894,
                "fields": [
                    {
                        "name": "Bot",
                        "value": `**Shard Ping: ** ${interaction.member.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${sharder.config.MaxShards}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,
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
                "components": [

                ]
            }
        ]
    };
    
    Object.keys(sharder.links.display).map(name => embeds.components[0].components.push({"type": 2, "label": name, "style": 5, "url": sharder.links.display[name]}))

    interaction.createMessage(embeds).catch(err => console.error("Cannot send messages to this channel", err));        
}

module.exports.description = "Shows info about the bot"