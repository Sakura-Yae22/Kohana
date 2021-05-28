module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, query} = itemsToImport;
        const userid = message.mentions[0].id || message.content.split(" ") [0] || message.author.id, total = 0;
        await (await query({text: 'SELECT * FROM users WHERE userid = $1', values: [userid]})).map(({bumps})=>{total+= parseInt(bumps)});

        message.channel.createMessage( {"embed": {"title": `User stats`,"description": `Total bumps: **${total}**`, "color": 5747894,"timestamp": new Date().toISOString()}}).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows a users total bumps.\n```??botPrefix??user```\n```??botPrefix??user @ USER```\n```??botPrefix??user <USER_ID>```"}
    ]
}