module.exports = {
    "commandLogic": async function commandLogic({message, sharder} = itemsToImport) {
        const totalBumps = await sharder.ipc.command("db", {text: 'SELECT SUM(bumps) FROM users WHERE userid = $1', values: [message.mentions[0]?.id || message.content.split(" ")[0] || message.author.id]}, true);
        message.channel.createMessage({"embed": {"title": `User stats`,"description": `Total bumps: **${totalBumps[0].sum}**`, "color": 5747894}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a users total bumps.\n```??botPrefix??user```\n```??botPrefix??user @ USER```\n```??botPrefix??user <USER_ID>```"}
    ]
};