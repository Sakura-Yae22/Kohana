// require libs and files
const { BaseClusterWorker } = require('eris-fleet'), Eris = require("eris"), cron = require('node-cron'), checkExpiredservers = require('./utils/checkExpiredservers');

class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        (async () => {
            // checkExpiredservers
            cron.schedule("0 0 * * *", () => { checkExpiredservers(this, true) });
            cron.schedule("* * * * *", () => { checkExpiredservers(this, false) });

            // init events
            const events = ["interactionCreate", "messageCreate"];
            events.map(async event => {
                this.bot.on(event, require(`./events/${event}.js`).bind(null, this));
                console.log(`[Event Loaded] ${event}`);
            })
        })();
    }

    shutdown(done) {
        done();
    }
}

export { BotWorker, Eris };