export default async(sharder, interaction) => {
    const {commandLogic} = await import(`../slashCommands/${interaction.data.name}.mjs`);
    commandLogic({interaction, sharder});
}