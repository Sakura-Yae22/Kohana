module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport
    // const help = {
    //     "embeds": [
    //         {
    //             "title": "Help",
    //             "description": `Below is a list of my commands. For further help you can join the [support server](${(await sharder.ipc.command("db", {text: 'SELECT * FROM links WHERE id = $1', values: ['support']}, true))[0].value}`,
    //             "fields": [],
    //             "color": 2717868,
    //         }
    //     ]
    // }

    console.log(await sharder.ipc.command("db", {text: 'SELECT * FROM links WHERE id = $1', values: ['support']}, true))

    const slashCommand = await sharder.bot.getCommands();
    slashCommand.map(command => {
        const {category} = require(`./${command.name}.js`)
        const catagoryIndex = help.embeds[0].fields.findIndex(element => element.name === category);

        if (catagoryIndex == -1) help.embeds[0].fields.push({ "name": category, "value": `\`\`\`\n${command.name}\n`, "inline": true })
        else help.embeds[0].fields[catagoryIndex].value += `${command.name}\n`
    })

    help.embeds[0].fields.map(field=>field.value+="```")

    interaction.createMessage(help).catch(err => console.error("Cannot send messages to this channel"));
}

module.exports.description = "Lists all commands"

module.exports.category = "Info" 