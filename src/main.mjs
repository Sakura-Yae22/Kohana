// require libs and files
import { BaseClusterWorker } from 'eris-fleet';
import Eris from "eris";
import cron from 'node-cron';
import checkExpiredservers from './utils/checkExpiredservers.mjs';

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
                const eventFuntion = await import(`./events/${event}.mjs`)
                this.bot.on(event, eventFuntion.default.bind(null, this));
                console.log(`[Event Loaded] ${event}`);
            })
        })();
    }

    shutdown(done) {
        done();
    }
}

export { BotWorker, Eris };