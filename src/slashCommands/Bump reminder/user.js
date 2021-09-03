module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    const totalBumps = await sharder.ipc.command("db", {text: 'SELECT SUM(bumps) FROM users WHERE userid = $1', values: [ interaction.data.options?.[0].value ?? interaction.member.id ]}, true);
    interaction.createMessage({"embeds": [{"title": `User stats`,"description": `Total bumps: **${totalBumps[0].sum}**`, "color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Shows a users total bumps"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to get stats about",
        "type": 6,
        "required": false,
    }
]