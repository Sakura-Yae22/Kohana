module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;

        const description = await sharder.ipc.command("makeserverLB", {guildID: message.channel.guild.id, durration: "week"}, true)
        message.channel.createMessage( {"embed": {"title": `Scoreboard`,"description": description,"color": 5747894,"timestamp": new Date()}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows the top bumpers of the week.\n```??botPrefix??weeklyscoreboard```"},
        {"name": "__Alias__","value": "```??botPrefix??weeklyleaderboard```"}
    ]
};