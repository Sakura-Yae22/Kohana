// require libs and files
const { BaseClusterWorker } = require('eris-fleet'), Eris = require("eris"), fs = require('fs/promises'), nekoslife = require("nekos.life"), cron = require('node-cron'), checkExpiredservers = require('./utils/checkExpiredservers');

class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        this.bot.slashCommands = new Map();
        this.bot.registeredSlashCMDs = new Map();

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

            const botCommands = await this.bot.getCommands();
            botCommands.map(registeredCMD => this.bot.registeredSlashCMDs.set(registeredCMD.name, registeredCMD.id))

            // init slash commands
            const slashCategories = await fs.readdir('slashCommands');
            slashCategories.map(async category => {
                const commands = await fs.readdir(`slashCommands/${category}`);
                commands.filter(name => name.endsWith(".js"));
                commands.map(command => {
                    const {commandLogic, description, options} = require(`./slashCommands/${category}/${command}`);
                    const cmd = command.split(".js")[0];
                    this.bot.slashCommands.set(cmd, commandLogic);
                 
                    if (!this.bot.registeredSlashCMDs.has(cmd)){
                        this.bot.createCommand({
                            name: cmd,
                            description: description,
                            options: options,
                            type: 1
                        });
                    }
            
                    console.log(`[Slash-command Loaded] ${cmd}`);
                });
            });
        })();
    }

    shutdown(done) {
        done();
    }
}

module.exports = { BotWorker, Eris };