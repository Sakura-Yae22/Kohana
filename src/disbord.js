// sharder.ipc.command("db", , true);

async function Disbord(message){
    if (message.embeds[0].description.includes(":thumbsup:")) {
        const timetobump = new Date().getTime() + 120 * 60000;
        const dbrequests = {
            "guild": await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]}),
            "users": await query({text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]}),
            "weeklyLB":await query({text: 'SELECT * FROM weeklylb WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]})
        };
        message.channel.createMessage( { "embed": { "title": `Bumped`, "color": 5747894, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err));
        if (dbrequests.guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values: [message.channel.id, timetobump, message.channel.guild.id]});    
        if (dbrequests.users.length===0) await query({text: 'INSERT INTO users (serverid, userid) VALUES ($1, $2)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        else await query({text: 'UPDATE users SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.users[0].bumps)+1, message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        if (dbrequests.weeklyLB.length===0) query({text: 'INSERT INTO weeklylb (serverid, userid, bumps) VALUES ($1, $2, $3)', values: [message.channel.guild.id, ((message.embeds[0].description.split("<@"))[1].split(">, "))[0], 1]});
        else query({text: 'UPDATE weeklylb SET bumps = $1 WHERE serverid = $2 AND userid = $3', values: [(dbrequests.weeklyLB[0].bumps)+1, message.channel.guild.id,((message.embeds[0].description.split("<@"))[1].split(">, "))[0]]});
        if (dbrequests.guild[0].constlbchannelid){
            sharder.bot.deleteMessage(dbrequests.guild[0].constlbchannelid, dbrequests.guild[0].constlbmsgid, "reason").catch(err => console.error("Cannot delete this message", err));
            const bumpLB =  await sharder.ipc.command("makeserverLB", {guildID: message.channel.guild.id, durration: "allTime", bot:sharder.bot}, true)
            let updatedChannel = await sharder.bot.createMessage(dbrequests.guild[0].constlbchannelid,{"embed": {"title": `Scoreboard`,"image": {"url":`attachment://LB_${message.id}.png`},"color": 5747894,"timestamp": new Date()}},{name: `LB_${message.id}.png`,file: Buffer.from(bumpLB.data)}).catch(err => console.error("Cannot send messages to this channel", err));
            query({text: 'UPDATE guilds SET constlbmsgid = $1 WHERE serverid = $2', values: [updatedChannel.id, message.channel.guild.id]});
        }

    }else if (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump")){                    
        const timetobump = new Date().getTime() + ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(" ", "").replace(" ", ""))) * 60000);
        const guild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]});
        message.channel.createMessage({ "embed": { "title": `Bump Failed`, "color": 15420513, "timestamp": new Date(timetobump).toISOString(), "footer": { "text": `Bump On: ` } } }).catch(err => console.error("Cannot send messages to this channel", err));
        if (guild.length === 0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values:[message.channel.id, timetobump, message.channel.guild.id]});                    
    }
}