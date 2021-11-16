import fs from 'fs/promises';

const arrayToObject1 = (arr, key) => {
    return arr.reduce((obj, item) => {
        obj[item[key]] = item
        return obj
    }, {})
}

export const commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;
    
    if (!(interaction.member.id === (await sharder.bot.getOAuthApplication()).owner.id)) return interaction.createMessage({"flags":64, "embeds": [{"title": "You are not my developer","color": 2717868}]}).catch(err=>console.error("Cannot send messages to this channel"));
    
    const names = arrayToObject1(await sharder.bot.getCommands(), "name")
    const slashCommands = await fs.readdir('./slashCommands');
    slashCommands.filter(name => name.endsWith(".mjs"));
    slashCommands.map(async slashCommand => {
        const name = slashCommand.split(".mjs")[0];

        const {description, options} = await import(`../slashCommands/${slashCommand}`);
        sharder.bot.editCommand(names[name].id, {name, description, options, type: 1})
    });
    
    interaction.createMessage({"embeds": [{"title": `Updated ${Object.keys(names).length} commands`,"color": 2717868}]}).catch(err=>console.error("Cannot send messages to this channel"));
}

export const description = "⚙️ Allows manual modification of the database"

export const category = "owner" 