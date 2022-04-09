import {readdir} from 'fs/promises';

export const commandLogic = async interaction => {    
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
    
    const slashCommands = (await readdir('./slashCommands')).filter(name => name.endsWith(".mjs")).map(name => name.split(".")[0]);
	await Promise.all(slashCommands.map(async command => {
        const {category} = await import(`./${command}.mjs`);
        const catagoryIndex = help.embeds[0].fields.findIndex(element => element.name === category);
    
        if (catagoryIndex == -1) help.embeds[0].fields.push({ "name": category, "value": `\`\`\`\n${command}\n\`\`\``, "inline": true })
        else help.embeds[0].fields[catagoryIndex].value = `${help.embeds[0].fields[catagoryIndex].value.slice(0, -3)}${command}\n${help.embeds[0].fields[catagoryIndex].value.slice(-3)}`;  

    }))

    interaction.createMessage(help).catch(err => {});
}

export const description = "Lists all commands"

export const category = "Info"