const {Fleet} = require('eris-fleet'), {inspect} = require('util'), path = require('path');

(async()=>{
	const {botToken, MaxShards, Postgrelogin} = require('/static/config.json');
	
	const Admiral = new Fleet({
		path: path.join(__dirname, "/main.js"),
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
				name: "makeserverLB", 
				path: path.join(__dirname, "./services/makeserverLB.js")
			},
			{
				name: "db", 
				path: path.join(__dirname, "./services/database.js")
			}
		]
	});

	if (require('cluster').isMaster) {
		// Admiral events
		Admiral.on('log', m => console.log(m));
		Admiral.on('debug', m => console.debug(m));
		Admiral.on('warn', m => console.warn(m));
		Admiral.on('error', m => console.error(inspect(m)));
	}

	module.exports.Postgrelogin = Postgrelogin
})()