module.exports.commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    interaction.createMessage( (await sharder.nekoslife.sfw.OwOify({text: interaction.data.options[0].value})).owo).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Sometimes you just nyeed to owoify youw speech"

module.exports.options = [
    {
      "name": "text",
      "description": "The text to owoify",
      "type": 3,
      "required": true,
    }
]