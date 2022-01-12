export const commandLogic = async itemsToImport => {
    const {interaction, bot} = itemsToImport
    
    const help = {
        "embeds": [
            {
                "title": "Help",
                "description": `Below is a list of my commands.`,
                "fields": [],
                "color": 2717868,
            }
        ]
    }

    const slashCommand = await bot.getCommands();
    await Promise.all(
        slashCommand.map(async command => {
            const {category} = await import(`./${command.name}.mjs`);
            const catagoryIndex = help.embeds[0].fields.findIndex(element => element.name === category);

            if (catagoryIndex == -1) help.embeds[0].fields.push({ "name": category, "value": `\`\`\`\n${command.name}\n\`\`\``, "inline": true })
            else help.embeds[0].fields[catagoryIndex].value = `${help.embeds[0].fields[catagoryIndex].value.slice(0, -3)}${command.name}\n${help.embeds[0].fields[catagoryIndex].value.slice(-3)}`;  
        })
    )

    interaction.createMessage(help).catch(err => console.error("Cannot send messages to this channel"));
}

export const description = "Lists all commands"

export const category = "Info" 