const Math = require('mathjs');
const { soyultro } = require("soyultro");
const { MessageEmbed } = require(`discord.js`)
module.exports = {
  name: 'poke',
  description: 'poke your friend',
  run: async (client, message, args, Discord) => {
    words = [
      "pokes",
      "boops",
    ]
    words1 = [
      "not too hard now",
      "boop!",
      "",
    ]

    let poke = soyultro("poke");



    personHugged = message.mentions.users.first()
    if (!personHugged) return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription("**Please mention a user to boop!**")
        .setFooter("Coded by: Achira Gaming")
    ).then(msg => {
      msg.delete({ timeout: 3000 }) && message.delete();
    })
    if (message.author.id === personHugged.id) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription("**You can not boop yourself**")
          .setFooter("Coded by: Achira Gaming")
      ).then(msg => {
        msg.delete({ timeout: 3000 }) && message.delete();
      })
    }


    if (personHugged) {

      let hugEmbed = new MessageEmbed()
        .setTitle(` ${message.author.username} ${words[Math.floor(Math.random() * words.length)]} ${personHugged.username} ${words1[Math.floor(Math.random() * words1.length)]}`
        )
        .setColor("RANDOM")

        .setImage(poke)
        .setTimestamp()
      message.channel.send(hugEmbed)



    }
  }
}