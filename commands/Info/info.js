module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {sendMessage, sharder, config, message} = itemsToImport;

        var embed = {"embed": {"title": "Info","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "Bot","value": `**Shard Ping: ** ${message.channel.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${config.MaxShards}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,"inline": false},{"name": `Creator`,"value": `[numselli#6964](https://numselli.github.io)`,"inline": false},{"name": `Links`,"value": ``,"inline": false}]}}
        for (let item in config.links){
            embed.embed.fields[embed.embed.fields.length-1].value+=`[${item}](${config.links[item]})\n`
        }
        sendMessage(message.channel.id, embed);
        
    },
    "help":[
        {"name": "__Usage__","value": "Shows info about the bot.\n```??botPrefix??info```"}
    ]
}