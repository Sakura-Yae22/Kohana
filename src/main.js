// require libs and files
const { BaseClusterWorker } = require('eris-fleet'), Eris = require("eris"), fs = require('fs/promises'), nekoslife = require("nekos.life"), cron = require('node-cron'), checkExpiredservers = require('./utils/checkExpiredservers');

class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        this.links = require('./settings/links.json');
        this.nekoslife = new nekoslife();

        (async () => {
            // checkExpiredservers
            cron.schedule("0 0 * * *", () => { checkExpiredservers(this, true) });
            cron.schedule("* * * * *", () => { checkExpiredservers(this, false) });

            // init events
            const events = await fs.readdir('events');
            events.map(async event => {
                const eventName = event.split(".")[0];
                this.bot.on(eventName, require(`./events/${event}`).bind(null, this));
                console.log(`[Event Loaded] ${eventName}`);
            })

            const names = (await this.bot.getCommands()).map(registeredCMD => registeredCMD.name)
            const slashCommands = await fs.readdir('slashCommands');
            slashCommands.filter(name => name.endsWith(".js"));
            slashCommands.map(async slashCommand => {
                const cmd = slashCommand.split(".js")[0];
                
                if (!names.includes(cmd)) {
                    const {description, options} = require(`./slashCommands/${slashCommand}`);
                    this.bot.createCommand({name: cmd, description: description, options: options, type: 1});
                }

                console.log(`[Slash Command Loaded] ${cmd}`);
            });
        })();
    }

    shutdown(done) {
        done();
    }
}

module.exports = { BotWorker, Eris };