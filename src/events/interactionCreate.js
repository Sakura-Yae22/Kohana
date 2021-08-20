module.exports = (sharder, interaction) => {
    if (!sharder.bot.slashCommands.has(interaction.data.name)) return;
    sharder.bot.slashCommands.get(interaction.data.name)({interaction, sharder});
}