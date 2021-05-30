const ascii = require('ascii-art');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message}=itemsToImport;
        const asciiText = "```" + await ascii.font(message.content, 'doom');
        message.channel.createMessage( (asciiText.length > 2000) ? 'The ASCII art is too big.' : asciiText+"```").catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Converts text to ASCII art.\n```\n?PREFIX?ascii <TEXT>\n```","inline": true}
    ]
};
