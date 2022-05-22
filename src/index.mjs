import Eris from 'eris'
import {readdir} from 'fs/promises';

import {botToken} from '/static/config.mjs';

const bot = new Eris(botToken, {
	intents: [
		"guilds"
	]
})

bot.once("ready", async () => {
	console.log("Ready!");
	
	const slashCommands = (await readdir('./slashCommands')).filter(name => name.endsWith(".mjs")).map(async cmdName => {
		const { description, options } = await import(`./slashCommands/${cmdName}.mjs`);
		return {
			name: cmdName,
			description,
			options,
			type: 1
		}
	});

	console.log(slashCommands)
})

bot.on("error", (err) => {
	console.error(err);
});

bot.on("interactionCreate", async (interaction) => {
	const { commandLogic } = await import(`./slashCommands/${interaction.data.name}.mjs`);
	commandLogic(interaction, bot);
})

bot.connect();