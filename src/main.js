// require libs and files
const { BaseClusterWorker } = require('eris-fleet'), Eris = require("eris"), fs = require('fs/promises'), nekoslife = require("nekos.life"), cron = require('node-cron'), checkExpiredservers = require('./utils/checkExpiredservers');

class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);

        this.bot.commands = new Map();
        this.bot.slashCommands = new Map();
        this.links = require('./settings/links.json');
        this.config = require('./static/config.json');
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

            // init commands
            const catagorys = await fs.readdir('commands');
            catagorys.map(async catagory => {
                const commands = await fs.readdir(`commands/${catagory}`);
                commands.filter(name => name.endsWith(".js"));
                commands.map(command => {
                    const { commandLogic, help } = require(`./commands/${catagory}/${command}`);
                    const cmd = command.split(".js")[0];
                    this.bot.commands.set(`${cmd}_Logic`, commandLogic);
                    this.bot.commands.set(`${cmd}_help`, help);
                    this.bot.commands.set(`${cmd}_catagory`, catagory);
                    console.log(`[command Loaded] ${cmd}`);
                });
            });

            // init slash commands
            const catagorys = await fs.readdir('slashCommands');
            catagorys.map(async catagory => {
                const commands = await fs.readdir(`slashCommands/${catagory}`);
                commands.filter(name => name.endsWith(".js"));
                commands.map(command => {
                    const {commandLogic, description, options} = require(`./slashCommands/${catagory}/${command}`);
                    const cmd = command.split(".js")[0];
                    this.bot.slashCommands.set(cmd, commandLogic);
                 
                    bot.createCommand({
                        name: cmd,
                        description: description,
                        options: options,
                        type: 1
                    });

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