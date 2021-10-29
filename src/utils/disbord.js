module.exports =  async (message, sharder) => {
    if (message.embeds[0].description.includes(":thumbsup:") || (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"))) {
        const bumpFailed = (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"));
        const timetobump = new Date().getTime() + (bumpFailed ? ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(/ /g, ""))) * 60000) : 120 * 60000);

        const massageArr = Array.from(message.channel.messages.keys())
        if (message.channel.messages.get(massageArr[massageArr.length-2]).content.toLowerCase() !== "!d bump") return;
        const bumperID = message.channel.messages.get(massageArr[massageArr.length-2]).author.id

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
            const discordUser = message.channel.guild.members.get(bumperID)
            const users = await sharder.ipc.command("db", {text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, bumperID]}, true);
            if (users.length===0) sharder.ipc.command("db", {text: 'INSERT INTO users (serverid, userid, username) VALUES ($1, $2, $3)', values: [message.channel.guild.id, bumperID, `${discordUser.username}#${discordUser.discriminator}`]});
            else sharder.ipc.command("db", {text: 'UPDATE users SET bumps = $1, username = $2 WHERE serverid = $3 AND userid = $4', values: [(users[0].bumps)+1, `${discordUser.username}#${discordUser.discriminator}`, message.channel.guild.id, bumperID]});
        }
        
        message.channel.createMessage({"embeds": [{"title": bumpFailed ? "Bump Failed" : "Bumped", "description": `Next bump on: <t:${Math.floor(timetobump / 1000)}>`, "color": bumpFailed ? 15420513 : 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
    }
}
