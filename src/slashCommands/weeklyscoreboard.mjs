import makeserverLB from '../utils/makeserverLB.mjs'

export const commandLogic = async itemsToImport => {
    const {interaction, sharder} = itemsToImport;

    const table = await sharder.ipc.command("db", {text: 'SELECT * FROM weeklylb WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [interaction.channel.guild.id]}, true);
    const scoreboard = await makeserverLB(table);

    interaction.createMessage({"embeds": [{"title": `Scoreboard`,"description": scoreboard,"color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows the top bumpers of the week"

export const category = "Bump reminder" 