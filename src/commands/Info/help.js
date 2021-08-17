module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, sharder} = itemsToImport;

        let help = {
            "embed": {
                "title": "Help", 
                "description": `Below is a list of my commands.\nFor more details on any command use **${sharder.config.botPrefix}help <command>**\nFor further help you can join the [support server](${sharder.links.display["Support server"]})`, 
                "fields": [],
                "color": 5747894, 
            }
        };
       
        const commandHelp = message.content.split(" ")[0];

        if (sharder.bot.commands.has(`${commandHelp}_help`)){
            help.embed.fields = JSON.parse(JSON.stringify(sharder.bot.commands.get(`${commandHelp}_help`)).replace(/\?\?botPrefix\?\?/g, sharder.config.botPrefix));
            help.embed.description=``;
        }else{
            Array.from(sharder.bot.commands.keys())
            .filter(name=>name.endsWith("_catagory"))
            .map(command=>{
                command = command.split("_")[0]
                const catagory = sharder.bot.commands.get(`${command}_catagory`)
                const catagoryIndex = help.embed.fields.findIndex(element => element.name === catagory)
                if (catagoryIndex != -1){
                    let splitString = help.embed.fields[catagoryIndex].value.split("```")
                    splitString[1]+=`${command}\n`       
                    help.embed.fields[catagoryIndex].value="```\n"+splitString.join("")+"```"
                }else help.embed.fields.push({"name": catagory, "value": "```\n"+command+"\n```","inline": true})
            })
        }

        message.channel.createMessage(help).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        { "name": "__Usage__", "value": "Lists all commands.\n```??botPrefix??help```\nGives information about a specific command.\n```??botPrefix??help <command>```" }
    ]
};