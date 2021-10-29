export const commandLogic = async itemsToImport => {
  const { interaction, sharder } = itemsToImport;
  
  if (!interaction.member.permissions.has("administrator")) return interaction.createMessage({"flags":64, "embeds": [{"title": `Error`, "description": "You must be the owner of this server or an administrator.","color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));

  const guild = await sharder.ipc.command("db", { text: 'SELECT * FROM guilds WHERE serverid = $1', values: [interaction.member.guild.id] }, true);
  if (guild.length === 0) return interaction.createMessage({"flags":64, "embeds": [{ "title": `Error`, "description": "Make a disbord bump first", "color": 5747894 }] }).catch(err => console.error("Cannot send messages to this channel", err));

  sharder.ipc.command("db", { text: 'UPDATE guilds SET bumpmessage = $1  WHERE serverid = $2', values: [interaction.data.options[0].value, interaction.member.guild.id] });
  interaction.createMessage({ "embeds": [{ "title": `Done`, "description": "The new reminder message for this server is: `" + interaction.data.options[0].value + "`", "color": 5747894 }] }).catch(err => console.error("Cannot send messages to this channel", err));
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