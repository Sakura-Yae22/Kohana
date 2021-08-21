const client = require('nekos.life');
const neko = new client();
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'anime-avatar',
   description: 'get anime-avatar image',
   run: async(client,message,args,Discord)=>{
    
    
    neko.sfw.avatar()
    .then((res) => {
        
        
        let hugEmbed = new MessageEmbed()
             .setTitle(`anime-avatar`)
             .setColor("RANDOM")
             .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
             .setImage(res.url)
             .setTimestamp()
             message.channel.send(hugEmbed)

      })
      .catch((err) => {
        console.error('api eror try again:', err)
      })
    }
}
        
        
        
    