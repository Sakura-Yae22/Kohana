module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    const scoreboard = await sharder.ipc.command("makeserverLB", {guildID: interaction.member.guild.id, durration: "week"}, true)
    interaction.createMessage({"embeds": [{"title": `Scoreboard`,"description": scoreboard,"color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows the top bumpers of the week"

module.exports.category = "Bump reminder" 