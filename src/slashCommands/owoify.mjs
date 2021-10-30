import nekosDotLife from "nekos.life";
const nekoslife = new nekosDotLife();

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    interaction.createMessage( (await nekoslife.sfw.OwOify({text: interaction.data.options[0].value})).owo).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Sometimes you just nyeed to owoify youw speech"

export const options = [
    {
      "name": "text",
      "description": "The text to owoify",
      "type": 3,
      "required": true,
    }
]

export const category = "Text & Images" 