const canvacord = require('canvacord');
const Canvacord = require('canvacord/src/Canvacord');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shit',
    description: "EWWWWWWWWWWW",
    usage: "[prefix]shit",
    run: async(client, message, args) => {
       
        const member = message.mentions.users.first() || message.author;
        if (message.author.id === member.id) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag)
                    .setDescription("**Well, what did you step in?**")
                    .setFooter("Coded by: Achira Gaming")
            ).then((msg => {
                msg.delete({ timeout: 10000 })
            }))
        }
        
        const mentionedMemberAvatar = member.displayAvatarURL({dynamic: false, format: "png"})
          

        
        

        let image = await Canvacord.shit(mentionedMemberAvatar)

        let shit = new MessageAttachment(image, "shit.png")

        message.channel.send(shit)
    }
}