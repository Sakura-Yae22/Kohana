module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {makeserverLB, message} = itemsToImport;
        const scoreboardbuffer = await makeserverLB(message.channel.guild.id, 'allTime')
        message.channel.createMessage( {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: scoreboardbuffer}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows the top bumpers.\n```??botPrefix??scoreboard```"},
        {"name": "__Alias__","value": "```??botPrefix??leaderboard```"}
    ]
}