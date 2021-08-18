module.exports =  async (message, sharder) => {
    if (message.embeds[0].description.includes(":thumbsup:") || (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"))) {
        const bumpFailed = (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"));
        const timetobump = new Date().getTime() + (bumpFailed ? ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(/ /g, ""))) * 60000) : 120 * 60000);
        const bumperID = ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]

        // set next bump time
        const correctBumpGuild = await sharder.ipc.command("db", {text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]}, true);
        if (correctBumpGuild.length===0) sharder.ipc.command("db", {text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else sharder.ipc.command("db", {text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values: [message.channel.id, timetobump, message.channel.guild.id]});    
       
        if (!bumpFailed){
            // update weekly lb
            const weeklyLB = await sharder.ipc.command("db", {text: 'SELECT * FROM weeklylb WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, bumperID]}, true);
            if (weeklyLB.length===0) sharder.ipc.command("db", {text: 'INSERT INTO weeklylb (serverid, userid, bumps) VALUES ($1, $2, $3)', values: [message.channel.guild.id, bumperID, 1]});
            else sharder.ipc.command("db", {text: 'UPDATE weeklylb SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(weeklyLB[0].bumps)+1, message.channel.guild.id,bumperID]});
            
            // update user's bumps
            const users = await sharder.ipc.command("db", {text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, bumperID]}, true);
            if (users.length===0) sharder.ipc.command("db", {text: 'INSERT INTO users (serverid, userid) VALUES ($1, $2)', values: [message.channel.guild.id, bumperID]});
            else sharder.ipc.command("db", {text: 'UPDATE users SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(users[0].bumps)+1, message.channel.guild.id, bumperID]});
        }
        
        message.channel.createMessage({"embed": {"title": bumpFailed ? "Bump Failed" : "Bumped", "color": bumpFailed ? 15420513 : 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": {"text": `Bump On: `}}}).catch(err => console.error("Cannot send messages to this channel", err));
       
        // update user's username
        const userData = await sharder.ipc.command("db", {text: 'SELECT * FROM userdata WHERE id = $1', values: [bumperID]}, true);
        const discordUser = await sharder.ipc.fetchUser(message.content) ?? await sharder.bot.getRESTUser(message.content).catch(err=>false);
        if (!discordUser) return
        if (userData.length===0) sharder.ipc.command("db", {text: 'INSERT INTO userdata (id, username) VALUES ($1, $2)', values: [bumperID, `${discordUser.username}#${discordUser.discriminator}`]});
        else sharder.ipc.command("db", {text: 'UPDATE userdata SET username = $1 WHERE id = $2', values: [username, `${discordUser.username}#${discordUser.discriminator}`]});    
    }
}