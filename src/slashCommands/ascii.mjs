import figlet from 'figlet'

export const commandLogic = async itemsToImport => {
    const { interaction } = itemsToImport;
    figlet(interaction.data.options[0].value, function (err, ascii) {
        if (err) return interaction.createMessage({"flags":64, "content": "error making ASCII art"}).catch(err => console.error("Cannot send messages to this channel", err));
        interaction.createMessage((ascii.length + 2 > 2000) ? 'The ASCII art is too big.' : "```" + ascii + "```").catch(err => console.error("Cannot send messages to this channel", err));
    });
}

export const description = "Converts text to ASCII art"


export const options = [
    {
      "name": "text",
      "description": "The text to convert to ASCII art",
      "type": 3,
      "required": true,
    }
]

export const category = "Text & Images" 