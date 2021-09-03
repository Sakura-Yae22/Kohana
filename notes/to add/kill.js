
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()
const { MessageEmbed } = require(`discord.js`)
module.exports = {
    name: 'kill',
    description: 'kill your friend',
    run: async (client, message, args, Discord) => {



        let { image } = await API.sfw.kill()

        personHugged = message.mentions.users.first()
        if (!personHugged) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription("**Please mention a user to kill!**")
                .setFooter("Coded by: Achira Gaming")
        ).then(msg => {
            msg.delete({ timeout: 3000 }) && message.delete();
        })
        if (personHugged) {

            if (message.author.id === personHugged.id) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setAuthor(message.author.tag)
                        .setDescription("**You can not kill yourself**")
                        .setFooter("Coded by: Achira Gaming")
                ).then(msg => {
                    msg.delete({ timeout: 3000 }) && message.delete();
                })
            }


            let hugEmbed = new MessageEmbed()
                .setTitle(`${message.author.username} kill ${personHugged.username} oof!`)

                .setColor("RANDOM")

                .setImage(image)
                .setTimestamp()
            message.channel.send(hugEmbed)



        }
    }
}