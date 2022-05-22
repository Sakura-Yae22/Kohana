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
	
	const slashCommands = (await readdir('./slashCommands')).filter(name => name.endsWith(".mjs"))
	
	const commands = await Promise.all(slashCommands.map(async cmdName => {
		const { description, options } = await import(`./slashCommands/${cmdName}`);
		return {
			name: cmdName.replace(".mjs", ""),
			description,
			options,
			type: 1
		}
	}));

	bot.bulkEditCommands(commands).catch(err=>{
		console.log("error updateing commands")
	})
})

bot.on("error", (err) => {
	console.error(err);
});

bot.on("interactionCreate", async (interaction) => {
	const { commandLogic } = await import(`./slashCommands/${interaction.data.name}.mjs`);
	commandLogic(interaction, bot);
})

bot.connect();