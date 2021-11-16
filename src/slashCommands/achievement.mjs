
export const commandLogic = async itemsToImport => {
    const { interaction } = itemsToImport;

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.member.user.username} has earned the achievement ${interaction.data.options[0].value}`,
            "color": 2717868,
            "image": {
                "url": `https://minecraftskinstealer.com/achievement/2/Achievement%20Unlocked/${interaction.data.options[0].value}`
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Creates a Minecraft like achievement banner"

export const options = [
    {
      "name": "text",
      "description": "The text to be turned into an achievement",
      "type": 3,
      "required": true,
    }
]

export const category = "Text & Images" 