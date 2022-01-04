import {query} from '../utils/database.mjs'

export const commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    const totalBumps = await query({text: 'SELECT SUM(bumps) FROM users WHERE userid = $1', values: [ interaction.data.options?.[0].value ?? interaction.member.id ]});
    interaction.createMessage({"embeds": [{"title": `User stats`,"description": `Total bumps: **${totalBumps[0].sum}**`, "color": 5747894}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Shows a users total bumps"

export const options = [
    {
        "name": "user",
        "description": "The user to get stats about",
        "type": 6,
        "required": false,
    }
]

export const category = "Bump reminder" 