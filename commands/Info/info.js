const {links, MaxShards} = require('../../config.json');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {sharder, message} = itemsToImport;

        let embed = {"embed": {"title": "Info","color": 5747894,"timestamp": new Date().toISOString(),"fields": [{"name": "Bot","value": `**Shard Ping: ** ${message.channel.guild.shard.latency} MS\n**Current shard: **${sharder.bot.shards.get(sharder.bot.shards.keys().next().value).id}\n**Total shards: **${MaxShards}\n**Uptime: **${(Math.floor(sharder.bot.uptime / (1000 * 60 * 60 * 24))).toFixed(0)} Day(s) ${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60 * 60)) / (1000 * 60))).toFixed(0)}:${(Math.floor((sharder.bot.uptime % (1000 * 60)) / 1000)).toFixed(0)}`,"inline": false},{"name": `Creator`,"value": `[numselli#6964](https://numselli.github.io)`,"inline": false},{"name": `Links`,"value": ``,"inline": false}]}}
        for (let item in links){
            embed.embed.fields[embed.embed.fields.length-1].value+=`[${item}](${links[item]})\n`
        }
        message.channel.createMessage( embed).catch(err => console.error("Cannot send messages to this channel", err));
        
    },
    "help":[
        {"name": "__Usage__","value": "Shows info about the bot.\n```??botPrefix??info```"}
    ]
}