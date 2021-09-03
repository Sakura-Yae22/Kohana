module.exports = (sharder, interaction) => {
    if (!sharder.bot.registeredSlashCMDs.has(interaction.data.name)) return;
    sharder.bot.slashCommands.get(interaction.data.name)({interaction, sharder});
}