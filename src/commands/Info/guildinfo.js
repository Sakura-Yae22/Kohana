module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const guild = message.channel.guild;

        message.channel.createMessage({
            "embeds": {
              "title": guild.name,
              "color": 5747894,
              "thumbnail": {
                "url":  guild.iconURL || 'https://cdn.discordapp.com/embeds/avatars/4.png'
              },
              "fields": [
                {
                    "name": "ID",
                    "value": `\`${guild.id}\``,
                    "inline": true
                },
                {
                  "name": "Icon",
                  "value": `[URL](${guild.iconURL  || "https://cdn.discordapp.com/embeds/avatars/4.png"})`,
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
                  "value": `${guild.roles.size || 0}`,
                  "inline": true
                },
                {
                    "name": "Categories",
                    "value": `${guild.channels.filter(channel => channel.type== 4).lenght || 0}`,
                    "inline": true
                },
                {
                    "name": "Text Channels",
                    "value": `${guild.channels.filter(channel => channel.type== 0).lenght || 0}`,
                    "inline": true
                },
                {
                    "name": "Voice Channels",
                    "value": `${guild.channels.filter(channel => channel.type== 2).lenght || 0}`,
                    "inline": true
                },
                {
                    "name": "Members",
                    "value": `${guild.memberCount}`,
                    "inline": true
                }
              ]
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows info about the about the guild.\n```??botPrefix??guildindo```"}
    ]
};