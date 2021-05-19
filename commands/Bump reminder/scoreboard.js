module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {sendMessage, makeserverLB, message} = itemsToImport;

        let scoreboardbuffer = await makeserverLB(message.channel.guild.id, 'allTime', message)
        sendMessage(message.channel.id, {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: scoreboardbuffer});
    },
    "help":[
        {"name": "__Usage__","value": "Shows the top bumpers.\n```??botPrefix??scoreboard```"},
        {"name": "__Alias__","value": "```??botPrefix??leaderboard```"}
    ]
}