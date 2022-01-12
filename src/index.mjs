import Eris from 'eris'
import {readdir} from 'fs/promises';

import {botToken} from '/static/config.mjs';
import {objectsEqual} from './utils/objectsEqual.mjs'

const bot = new Eris(botToken, {
	intents: [
		"guilds",
	],
	disableEvents: {
		VOICE_STATE_UPDATE: true,
		USER_UPDATE: true,
		TYPING_START: true,
		PRESENCE_UPDATE: true,
		GUILD_BAN_ADD: true,
		GUILD_BAN_REMOVE: true,
		MESSAGE_UPDATE: true,
		GUILD_MEMBER_ADD: true,
		GUILD_MEMBER_REMOVE: true,
		GUILD_MEMBER_UPDATE: true,
		GUILD_ROLE_CREATE: true,
		GUILD_ROLE_DELETE: true,
		GUILD_ROLE_UPDATE: true,
		GUILD_UPDATE: true
	}
})

bot.once("ready", async () => {
	console.log("Ready!");

	const commands = new Map();

	(await bot.getCommands()).map(async registerdCommand => {
		commands.set(registerdCommand.name, registerdCommand)
	})
	const slashCommands = (await readdir('./slashCommands')).filter(name => name.endsWith(".mjs")).map(name => name.split(".")[0]);
	let create = 0, update = 0;
	await Promise.all(slashCommands.map(async name => {
		const { description, options } = await import(`./slashCommands/${name}.mjs`);
		if (commands.has(name)) {
			const thisCommand = commands.get(name)
			if (thisCommand.description !== description || objectsEqual(thisCommand.options, options)) {
				update += 1
				bot.editCommand(commands[commands.findIndex(CMD => CMD.name === name)].id, { name, description, options })
			}
		} else {
			create += 1
			bot.createCommand({ name, description, options, type: 1 });
		}
	}));
	console.log(`Updated ${update} commands, created ${create} commands`)
})

bot.on("error", (err) => {
	console.error(err); // or your preferred logger
});

bot.on("interactionCreate", async (interaction) => {
	const { commandLogic } = await import(`./slashCommands/${interaction.data.name}.mjs`);
	commandLogic({ interaction, bot });
})

bot.connect();