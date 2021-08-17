module.exports = {
    "commandLogic": async function commandLogic({sharder, message} = itemsToImport) {
        let embed = {"embed": {"title": "Info","color": 5747894,"fields": [{"name": "Bot","value": `**Shard Ping: ** ${message.channel.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${sharder.config.MaxShards}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,"inline": false},{"name": `Creator`,"value": `[numselli#6964](https://numselli.xyz)`,"inline": false}]},"components": [{"type": 1, "components": []}]};
        
        Object.keys(sharder.links.display).map(name => embed.components[0].components.push({"type": 2, "label": name, "style": 5, "url": sharder.links.display[name]}))

        message.channel.createMessage(embed).catch(err => console.error("Cannot send messages to this channel", err));        
    },
    "help":[
        {"name": "__Usage__","value": "Shows info about the bot.\n```??botPrefix??info```"}
    ]
};