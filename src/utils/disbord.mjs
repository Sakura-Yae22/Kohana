import {query} from '../utils/database.mjs'

export default async (message) => {
    if (message.embeds[0].description.includes(":thumbsup:") || (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"))) {
        const bumpFailed = (message.embeds[0].description.includes("Please wait another") && !message.embeds[0].description.includes("until you can bump"));
        const timetobump = new Date().getTime() + (bumpFailed ? ((parseInt(((message.embeds[0].description.split("another"))[1].split("minutes")[0]).replace(/ /g, ""))) * 60000) : 120 * 60000);

        const massageArr = Array.from(message.channel.messages.keys())
        if (message.channel.messages.get(massageArr[massageArr.length-2]).content.toLowerCase() !== "!d bump") return;

        const bumper = message.channel.messages.get(massageArr[massageArr.length-2]).author

        // set next bump time
        const correctBumpGuild = await query({text: 'SELECT * FROM guilds WHERE serverid = $1', values: [message.channel.guild.id]});
        if (correctBumpGuild.length===0) query({text: 'INSERT INTO guilds (serverid, channelid, timetobump) VALUES ($1, $2, $3)', values: [message.channel.guild.id, message.channel.id, timetobump]});
        else query({text: 'UPDATE guilds SET channelid = $1, timetobump = $2 WHERE serverid = $3', values: [message.channel.id, timetobump, message.channel.guild.id]});    
       
        if (!bumpFailed){    
            // update user's bumps
            const users = await query({text: 'SELECT * FROM users WHERE serverid = $1 AND userid = $2', values: [message.channel.guild.id, bumper.id]});
            if (users.length===0) query({text: 'INSERT INTO users (serverid, userid, username, bumps) VALUES ($1, $2, $3, $4)', values: [message.channel.guild.id, bumper.id, `${bumper.username}#${bumper.discriminator}`, 1]});
            else query({text: 'UPDATE users SET bumps = FLOOR(bumps) + 1, username = $1 WHERE serverid = $2 AND userid = $3', values: [`${bumper.username}#${bumper.discriminator}`, message.channel.guild.id, bumper.id]});
        }
        
        message.channel.createMessage({"embeds": [{"title": bumpFailed ? "Bump Failed" : "Bumped", "description": `Next bump on: <t:${Math.floor(timetobump / 1000)}>`, "color": bumpFailed ? 15420513 : 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
    }
}
