const figlet = require('figlet');
module.exports = {
    "commandLogic": async function commandLogic(itemsToImport){
        const {message}=itemsToImport;
        figlet(message.content, function(err, ascii) {
            if (err) return message.channel.createMessage("error making ASCII art").catch(err => console.error("Cannot send messages to this channel", err));
            message.channel.createMessage( (ascii.length+2 > 2000) ? 'The ASCII art is too big.' : "```"+ascii+"```").catch(err => console.error("Cannot send messages to this channel", err));
        });
    },
    "help":[
        {"name": "__Usage__","value": "Converts text to ASCII art.\n```\n??botPrefix??ascii <TEXT>\n```","inline": true}
    ]
};
