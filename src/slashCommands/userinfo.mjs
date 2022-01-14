export const commandLogic = async interaction => {
  const member = interaction.member.guild.members.get(interaction.data.options?.[0].value) ?? interaction.member;

  interaction.createMessage({
    "embeds": [
      {
        "title": `${member.username}#${member.discriminator}${member.nick ? ` (${member.nick})` : ""}`,
        "color": 5747894,
        "thumbnail": {
          "url": member.avatarURL
        },
        "fields": [
          {
            "name": "ID",
            "value": `\`${member.id}\``,
            "inline": true
          },
          {
            "name": "Avatar",
            "value": `[URL](${member.avatarURL})`,
            "inline": true
          },
          {
            "name": "Joined",
            "value": `\`${new Date(member.joinedAt).toLocaleString()}\``,
            "inline": true
          },
          {
            "name": "Registered",
            "value": `\`${new Date(member.createdAt).toLocaleString()}\``,
            "inline": true
          },
          {
            "name": "Roles",
            "value": member.roles.length === 0 ? "None" : `<@&${member.roles.join(">, <@&")}>`,
            "inline": true
          }
        ]
      }
    ]
  }).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows info about the about a guild member"

export const options = [
  {
    "name": "user",
    "description": "The user to get info about",
    "type": 6,
    "required": false,
  }
]

export const category = "Info" 