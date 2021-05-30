const nekoslife = require("nekos.life"), {sfw} = new nekoslife();
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message} = itemsToImport;

        message.channel.createMessage( (await sfw.OwOify({text: message.content})).owo).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Sometimes you just nyeed to owoify youw speech.\n```\n?PREFIX?help <command>\n```","inline": true}
    ]
};