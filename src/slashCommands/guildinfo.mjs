export const commandLogic = async interaction => {
  const guild = interaction.member.guild;

  interaction.createMessage({
    "embeds": [{
      "title": guild.name,
      "color": 5747894,
      "thumbnail": {
        "url": guild.iconURL ?? 'https://cdn.discordapp.com/embeds/avatars/4.png'
      },
      "fields": [
        {
          "name": "ID",
          "value": `\`${guild.id}\``,
          "inline": true
        },
        {
          "name": "Icon",
          "value": `[URL](${guild.iconURL ?? "https://cdn.discordapp.com/embeds/avatars/4.png"})`,
          "inline": true
        },
        {
          "name": "Owner",
          "value": `<@${guild.ownerID}>`,
          "inline": true
        },
        {
          "name": "Region",
          "value": `\`${guild.region}\``,
          "inline": true
        },
        {
          "name": "Roles",
          "value": `${guild.roles.size ?? 0}`,
          "inline": true
        },
        {
          "name": "Categories",
          "value": `${guild.channels.filter(channel => channel.type == 4).length ?? 0}`,
          "inline": true
        },
        {
          "name": "Text Channels",
          "value": `${guild.channels.filter(channel => channel.type == 0).length ?? 0}`,
          "inline": true
        },
        {
          "name": "Voice Channels",
          "value": `${guild.channels.filter(channel => channel.type == 2).length ?? 0}`,
          "inline": true
        },
        {
          "name": "Members",
          "value": `${guild.memberCount}`,
          "inline": true
        }
      ]
    }]
  }).catch(err => {});
}

export const description = "Shows info about the about the guild"

export const category = "Info" 