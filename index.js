const config = require('./config.json'), Sharder = require('eris-sharder').Master, {Client:PG, types} = require('pg');
let pgclient;
types.setTypeParser(1700, 'text', parseFloat);

new Sharder(config.botToken, "/main.js", {
	stats: false,
	debug: true,
	guildsPerShard: 1500,
	shards: config.MaxShards,
	name: "Kohana",
	clientOptions: {
		messageLimit: 150,
		restMode: true,
		defaultImageFormat: "png",
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
	}
})

function pgClientConnect(){
	pgclient = new PG(config.Postgrelogin);
	pgclient.connect(err => {
		if (err) {
			console.error(`[${new Date().toLocaleString()}] `, err.stack);
		} else {
			console.log(`[${new Date().toLocaleString()}] postgres connected and ready`);
		}
	})
}
pgClientConnect()
exports.query = function query(statement) {
	return new Promise((resolve, reject) => {
		pgclient.query(statement, (err, res) => {
			if (err) reject(err);
			resolve(res.rows);
		});
	}).catch(err => {
		pgclient.end().then(pgClientConnect())
		console.error(statement)
		console.error(err)
		return err
	})
}

exports.config = config;