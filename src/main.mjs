// require libs and files
import { BaseClusterWorker } from 'eris-fleet';
import Eris from "eris";
import cron from 'node-cron';
import checkExpiredservers from './utils/checkExpiredservers.mjs';
import fs from 'fs/promises';

const arrayToObject1 = (arr, key) => {
    return arr.reduce((obj, item) => {
        obj[item[key]] = item
        return obj
    }, {})
}


class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        (async () => {

            this.bot.createCommand({"name":"refreshcommands", "description":'⚙️ Allows manual modification of the database', type: 1});


            checkExpiredservers
            cron.schedule("0 0 * * *", () => {checkExpiredservers(this, true)});
            cron.schedule("* * * * *", () => {checkExpiredservers(this, false)});

            // init events
            const events = ["interactionCreate", "messageCreate"];
            events.map(async event => {
                const eventFuntion = await import(`./events/${event}.mjs`)
                this.bot.on(event, eventFuntion.default.bind(null, this));
                console.log(`[Event Loaded] ${event}`);
            })

            const names = arrayToObject1(await this.bot.getCommands(), "name")
            const slashCommands = await fs.readdir('./slashCommands');
            slashCommands.filter(name => name.endsWith(".mjs"));
            slashCommands.map(async slashCommand => {
                const name = slashCommand.split(".mjs")[0];

                if (names[name]) return;
                console.log(`[Slash Command Loaded] ${name}`);           
        
                const {description, options} = await import(`./slashCommands/${slashCommand}`);
                this.bot.createCommand({name, description, options, type: 1});
            });
        })();
    }

    shutdown(done) {
        done();
    }
}

export { BotWorker, Eris };