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

	const commands = new Map(
		await Promise.all(
			(await bot.getCommands()).map((command) => [command.name, command])
		)
	);
	
	const slashCommands = (await readdir('./slashCommands')).filter(name => name.endsWith(".mjs")).map(name => name.split(".")[0]);
	slashCommands.map(async name => {
		const { description, options } = await import(`./slashCommands/${name}.mjs`);
		if (commands.has(name)) bot.editCommand(commands.get(name).id, {name, description, options})
		else bot.createCommand({ name, description, options, type: 1 });
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
