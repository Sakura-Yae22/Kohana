const {botPrefix, links} = require('../../config.json');

module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message, runCmds} = itemsToImport;

        let help = {
            "embed": {
                "title": "Help", 
                "description": `Below is a list of my commands.\nFor more details on any command use **${botPrefix}help <command>**\nFor further help you can join the [support server](${links["Support server"]})`, 
                "fields": [],
                "color": 5747894, 
                "timestamp": new Date().toISOString()
            }
        }
       
        const commandHelp = message.content.split(" ")[1]

        if (Object.keys(runCmds).includes(commandHelp)){
            help.embed.fields = JSON.parse(JSON.stringify(runCmds[commandHelp].help).split("??botPrefix??").join(botPrefix))
            help.embed.description=``;
        }else{
            for (const command in runCmds){
                let catagorynum
                help.embed.fields.forEach(field=> {
                    catagorynum = (field.name == runCmds[command].catagory)
                })

                if (catagorynum){
                    let index = help.embed.fields.findIndex(element => element.name === runCmds[command].catagory)
                    let splitString = help.embed.fields[index].value.split("```")
                    splitString[1]=`${splitString[1]}${command}\n`                    
                    help.embed.fields[index].value="```\n"+splitString.join("")+"```"
                }else{
                    help.embed.fields.push({"name": runCmds[command].catagory, "value": "```\n"+command+"\n```","inline": true})
                }
            }
        }
        message.channel.createMessage( help).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        { "name": "__Usage__", "value": "Lists all commands.\n```??botPrefix??help```\nGives information about a specific command.\n```??botPrefix??help <command>```" }
    ]
}