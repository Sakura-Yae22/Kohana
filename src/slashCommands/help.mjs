export const commandLogic = async (interaction, bot) => {    
    const help = {
        "embeds": [
            {
                "title": "Help",
                "description": `Below is a list of my commands.`,
                "fields": [],
                "color": 2717868,
                "footer":{
                    "text":"Made by numselli#6964  ( https://numselli.xyz )"
                }
            }
        ]
    }

    
    await Promise.all((await bot.getCommands()).map(async command => {
        const file = await import(`./${command.name}.mjs`).catch(err=>{false});
        if(!file) return;
        const {category} = file;
        const catagoryIndex = help.embeds[0].fields.findIndex(element => element.name === category);
    
        if (catagoryIndex == -1) help.embeds[0].fields.push({ "name": category, "value": `\`\`\`\n${command.name}\n\`\`\``, "inline": true })
        else help.embeds[0].fields[catagoryIndex].value = `${help.embeds[0].fields[catagoryIndex].value.slice(0, -3)}${command.name}\n${help.embeds[0].fields[catagoryIndex].value.slice(-3)}`;  
    }))

    interaction.createMessage(help).catch(err => {});
}

export const description = "Lists all commands"

export const category = "Info"