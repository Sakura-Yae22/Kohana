const figlet = require('figlet');
module.exports = {
    "commandLogic": function commandLogic(itemsToImport){
        let {message}=itemsToImport;
        figlet(message.content, function(err, data) {
            if (err) {
                console.dir(err);
                return;
            }
            data = "```\n"+data+"```"
            message.channel.createMessage( (data.length > 2000) ? 'The ASCII art is too big.' : data).catch(err => console.error("Cannot send messages to this channel", err));
        });
    },
    "help":[
        {"name": "__Usage__","value": "Converts text to ASCII art.\n```\n?PREFIX?ascii <TEXT>\n```","inline": true}
    ]
}
