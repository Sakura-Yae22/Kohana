const {Fleet} = require('eris-fleet'), {Client: PG, types} = require('pg'), {inspect} = require('util'), path = require('path');

(async()=>{
	const {botToken, MaxShards, Postgrelogin, botPrefix, links} = require('./static/config.json');

	let pgclient;
	types.setTypeParser(1700, 'text', parseFloat);
	
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
				name: `${botPrefix}help`,
				type: 0, 
			}
		},
		clientOptions: {
			restMode: true,
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
				path: path.join(__dirname, "./utils/makeserverLB.js")
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

	function pgClientConnect() {
		pgclient = new PG(Postgrelogin);
		pgclient.connect(err => {
			if (err) console.error(`[${new Date().toLocaleString()}] `, err.stack);
			else console.log(`[${new Date().toLocaleString()}] postgres connected and ready`);
		})
	}
	pgClientConnect();
	module.exports.query = async function query(statement) {
		if (!pgclient._connected) return {"error": "not conected to DB"}
		return new Promise((resolve, reject) => {
			pgclient.query(statement, (err, res) => {
				if (err) reject(err);
				resolve(res.rows);
			});
		}).catch(async err => {
			await pgclient.end()
			pgClientConnect()
			console.error(JSON.stringify(statement), err)
			return err
		})
	}

	module.exports.links = links
})()