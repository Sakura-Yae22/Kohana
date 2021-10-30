import { isMaster } from 'cluster';
import { Fleet } from 'eris-fleet';
import { inspect } from 'util';

import {BotWorker} from './main.mjs';
import { ServiceWorker as dbWorker } from './services/database.mjs';

import { MaxShards, botToken } from './static/config.mjs';

const Admiral = new Fleet({
	BotWorker,
	token: botToken,
	shards: MaxShards,
	guildsPerShard: 1500,
	statsInterval: 'disable',
	whatToLog: {
		blacklist:[
			"stats_update"
		]
	},
	startingStatus:{
		status: "dnd", 
		game: {
			name: '/help',
			type: 0, 
		}
	},
	clientOptions: {
		intents:[
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
	},
	services: [
		{
			name: "db", 
			ServiceWorker: dbWorker
		}
	]
});

// Admiral events
if (isMaster) {
	Admiral.on('log', m => console.log(m));
	Admiral.on('debug', m => console.debug(m));
	Admiral.on('warn', m => console.warn(m));
	Admiral.on('error', m => console.error(inspect(m)));
}