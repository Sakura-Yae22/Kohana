module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    console.log(JSON.stringify(interaction))

    // const mentionedUserID = typeof interaction.data.resolved ? Object.keys(interaction.data.resolved.users)[0] : null;
    // interaction.data.resolved.users[mentionedUserID].id ?? interaction.member.user.id
    // const totalBumps = await sharder.ipc.command("db", {text: 'SELECT SUM(bumps) FROM users WHERE userid = $1', values: [ mentionedUserID ? interaction.data.resolved.users[mentionedUserID].id : interaction.member.user.id]}, true);
    // interaction.createMessage({"embeds": [{"title": `User stats`,"description": `Total bumps: **${totalBumps[0].sum}**`, "color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
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