export default async(sharder, interaction) => {
    const {commandLogic} = require(`../slashCommands/${interaction.data.name}`);
    commandLogic({interaction, sharder});
}