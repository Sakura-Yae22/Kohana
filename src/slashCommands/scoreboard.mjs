import makeserverLB from '../utils/makeserverLB.mjs'
import {query} from '../utils/database.mjs'

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const table = await query({text: 'SELECT * FROM users WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [interaction.member.guild.id]});
    const scoreboard = await makeserverLB(table);

    interaction.createMessage({"embeds": [{"title": `Scoreboard`,"description": scoreboard,"color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows the top bumpers"

export const category = "Bump reminder" 