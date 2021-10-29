module.exports.commandLogic = async itemsToImport => {
    const {sharder, interaction} = itemsToImport;    
    const stats = await sharder.ipc.getStats();

    const embeds = {
        "embeds": [
            {
                "title": "Info",
                "color": 5747894,
                "fields": [
                    {
                        "name": "Bot",
                        "value": `**Shard Ping: ** ${interaction.member.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${stats.shardCount}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,
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
    
    await (await sharder.ipc.command("db", {text: 'SELECT * FROM links', values: []}, true)).map(displayLink => embeds.components[0].components.push({"type": 2, "label": displayLink.name, "style": 5, "url": displayLink.value}))

    interaction.createMessage(embeds).catch(err => console.error("Cannot send messages to this channel", err));        
}

module.exports.description = "Shows info about the bot"

module.exports.category = "Info" 