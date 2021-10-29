export const commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    const scoreboard = await sharder.ipc.command("makeserverLB", {guildID: interaction.member.guild.id, durration: "week"}, true)
    interaction.createMessage({"embeds": [{"title": `Scoreboard`,"description": scoreboard,"color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows the top bumpers of the week"

export const category = "Bump reminder" 