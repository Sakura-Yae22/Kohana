module.exports = async(sharder, interaction) => {
    if (!(await sharder.bot.getCommand(interaction.data.id))) return;
    const {commandLogic} = require(`../slashCommands/${interaction.data.name}`);
    commandLogic({interaction, sharder});
}