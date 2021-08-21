const { AnimeWallpaper } = require("anime-wallpapers");
const wall = new AnimeWallpaper();
const {MessageEmbed} = require (`discord.js`)
module.exports = {
   name:'anime-wallpaper',
   description: 'get anime-avatar image',
   run: async(client,message,args,Discord)=>{
    
    
    const wallpaper = await wall.getAnimeWall3()
        
        
        let hugEmbed = new MessageEmbed()
             .setTitle(wallpaper[0].title)
             .setColor("RANDOM")
             .setFooter(
        `Requested By: ${message.author.tag}`,
        message.author.avatarURL({ dynamic: true })
      )
             .setImage(wallpaper[0].image)
             .setTimestamp()
             message.channel.send(hugEmbed)

      .catch((err) => {
        console.error('api eror try again:', err)
      })
    }
}
        
        
        
    