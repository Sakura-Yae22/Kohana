const figlet = require('figlet');
module.exports = {
    "commandLogic": function commandLogic(message, sendMessage){
        figlet(message.content, function(err, data) {
            if (err) {
                console.dir(err);
                return;
            }
            data = "```\n+"+data+"```"
            sendMessage(message.channel.id, (data.length > 2000) ? 'The ASCII art is too big.' : data)
        });
    },
    "help":[
        {"name": "__Usage__","value": "Converts text to ASCII art.\n```\n?PREFIX?ascii <TEXT>\n```","inline": true}
    ]
}