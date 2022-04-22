export const commandLogic = async interaction => {
  const owo = await (await fetch(`https://nekos.life/api/v2/owoify?text=${interaction.data.options[0].value}`)).json()

  interaction.createMessage(owo.owo).catch(err => {});
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