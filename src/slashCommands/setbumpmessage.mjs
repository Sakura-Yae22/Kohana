import {query} from '../utils/database.mjs'

export const commandLogic = async itemsToImport => {
  const { interaction} = itemsToImport;
  
  console.log(interaction.data.options[0].value)
  if (!interaction.member.permissions.has("administrator")) return interaction.createMessage({"flags":64, "embeds": [{"title": `Error`, "description": "You must be the owner of this server or an administrator.","color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));

  const guild = await query({ text: 'SELECT * FROM guilds WHERE serverid = $1', values: [interaction.member.guild.id] });
  if (guild.length === 0) return interaction.createMessage({"flags":64, "embeds": [{ "title": `Error`, "description": "Make a disbord bump first", "color": 5747894 }] }).catch(err => console.error("Cannot send messages to this channel", err));

  query({ text: 'UPDATE guilds SET bumpmessage = $1  WHERE serverid = $2', values: [interaction.data.options[0].value, interaction.member.guild.id] });
  interaction.createMessage({ "embeds": [{ "title": `The new reminder message for this server is:`, "description": interaction.data.options[0].value, "color": 5747894 }] }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "🔑 Allows you to change the bump reminder message"

export const options = [
  {
    "name": "text",
    "description": "The message to be sent when it is time to bump",
    "type": 3,
    "required": true,
  }
]

export const category = "Bump reminder" 