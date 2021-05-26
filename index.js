const {botToken, MaxShards, Postgrelogin} = require('./config.json'), Sharder = require('eris-sharder').Master, {Client:PG, types} = require('pg');
let pgclient;
types.setTypeParser(1700, 'text', parseFloat);

new Sharder(botToken, "/main.js", {
	stats: false,
	debug: true,
	guildsPerShard: 1500,
	shards: MaxShards,
	name: "Kohana",
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
	}
})

function pgClientConnect() {
	pgclient = new PG(Postgrelogin);
	pgclient.connect(err => {
		if (err) console.error(`[${new Date().toLocaleString()}] `, err.stack);
		else console.log(`[${new Date().toLocaleString()}] postgres connected and ready`);
	})
}
pgClientConnect();
exports.query = async function query(statement) {
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
