import Eris from 'eris'
import cron from 'node-cron';
import fs from 'fs/promises';

import {botToken} from './static/config.mjs';
import checkExpiredservers from './utils/checkExpiredservers.mjs';
import {objectsEqual} from './utils/objectsEqual.mjs'
import disbord from './utils/disbord.mjs'

const bot = new Eris(botToken, {
	intents: [
		"guilds",
		"guildMessages",
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

bot.on("ready", async () => { // When the bot is ready
	console.log("Ready!"); // Log "Ready!"
	bot.editStatus("dnd", [{ name: '/help', type: 0 }])

	const commands = new Map();

	(await bot.getCommands()).map(async registerdCommand => {
		commands.set(registerdCommand.name, registerdCommand)
	})
	const slashCommands = (await fs.readdir('./slashCommands')).filter(name => name.endsWith(".mjs")).map(name => name.split(".")[0]);
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

});

bot.once("ready", () => {
	cron.schedule("0 0 * * *", checkExpiredservers);
	cron.schedule("* * * * *", checkExpiredservers);
})

bot.on("error", (err) => {
	console.error(err); // or your preferred logger
});

bot.on("interactionCreate", async (interaction) => {
	// console.log(bot)
	const { commandLogic } = await import(`./slashCommands/${interaction.data.name}.mjs`);
	commandLogic({ interaction, bot });
})

bot.on("messageCreate", async message => {
	checkExpiredservers();
	if (message.author.id == "302050872383242240") return disbord(message)
})

bot.connect();