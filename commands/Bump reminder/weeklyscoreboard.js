module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {makeserverLB, message} = itemsToImport;

        let buffer = await makeserverLB(message.channel.guild.id, 'week', message);
        message.channel.createMessage( {"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: buffer}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows the top bumpers of the week.\n```??botPrefix??weeklyscoreboard```"},
        {"name": "__Alias__","value": "```??botPrefix??weeklyleaderboard```"}
    ]
}