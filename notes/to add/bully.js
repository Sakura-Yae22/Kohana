
const Math = require('mathjs');
const { soyultro } = require("soyultro");
const { MessageEmbed } = require(`discord.js`)
module.exports = {
  name: 'bully',
  description: 'bully your friend',
  run: async (client, message, args, Discord) => {
    words = [
      ">:3",
      "c:<",
      "Ha! Deserves it.",
      "hahaha",
      "feel the pain!",




    ]


    let bully = soyultro("bully");


    personHugged = message.mentions.users.first()
    if (!personHugged) return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag)
        .setDescription("**Please mention a user to bully!**")
        .setFooter("Coded by: Achira Gaming")
    ).then(msg => {
      msg.delete({ timeout: 3000 }) && message.delete();
    })
    if (message.author.id === personHugged.id) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(message.author.tag)
          .setDescription("**You can not bully yourself**")
          .setFooter("Coded by: Achira Gaming")
      ).then(msg => {
        msg.delete({ timeout: 3000 }) && message.delete();
      })
    }


    if (personHugged) {

      let hugEmbed = new MessageEmbed()
        .setTitle(`${message.author.username} bullies ${personHugged.username} ${words[Math.floor(Math.random() * words.length)]}`)
        .setColor("RANDOM")

        .setImage(bully)
        .setTimestamp()
      message.channel.send(hugEmbed)



    }
  }
}