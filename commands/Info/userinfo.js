module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        const {message} = itemsToImport;

        const member = message.channel.guild.members.get(message.author.id);

        message.channel.createMessage({
            "embed": {
              "title": `${member.username}#${member.discriminator}${member.nick ? ` (${member.nick})` : ""}`,
              "color": 5747894,
              "timestamp": new Date().toISOString(),
              "thumbnail": {
                "url":  member.avatarURL
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
                  "value": `\`${new Date (member.joinedAt).toLocaleString()}\``,
                  "inline": true
                },
                {
                  "name": "Registered",
                  "value": `\`${new Date (member.createdAt).toLocaleString()}\``,
                  "inline": true
                },
                {
                  "name": "Roles",
                  "value": `<@&${member.roles.join(">, <@&")}>`,
                  "inline": true
                }
              ]
            }
        }).catch(err => console.error("Cannot send messages to this channel", err));
    },
    "help":[
        {"name": "__Usage__","value": "Shows info about the about a guild member.\n```??botPrefix??userinfo```"}
    ]
};