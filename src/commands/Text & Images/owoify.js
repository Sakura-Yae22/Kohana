module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message, sharder} = itemsToImport;

        message.channel.createMessage( (await sharder.nekoslife.sfw.OwOify({text: message.content})).owo).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Sometimes you just nyeed to owoify youw speech.\n```\n??botPrefix??owoify <text>\n```","inline": true}
    ]
};