import fs from 'fs/promises';

export const commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;
    
    if (interaction.member.id !== (await sharder.bot.getOAuthApplication()).owner.id) return interaction.createMessage({"flags":64, "embeds": [{"title": "You are not my developer","color": 2717868}]}).catch(err=>{});
    
    const commands= await sharder.bot.getCommands()
    commands.map(cmd=>{
        sharder.bot.deleteCommand(cmd.id)
    })


    const slashCommands = await fs.readdir('./slashCommands');
    slashCommands.filter(name => name.endsWith(".mjs"));
    slashCommands.map(async slashCommand => {
        const name = slashCommand.split(".mjs")[0];

        const {description, options} = await import(`../slashCommands/${slashCommand}`);
        sharder.bot.createCommand({name, description, options, type: 1});
    });
    
    interaction.createMessage({"embeds": [{"title": `Updated ${slashCommands.length} commands`,"color": 2717868}]}).catch(err=>{});
}

export const description = "⚙️ Allows manual modification of the database"

export const category = "owner" 