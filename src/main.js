// require libs and files
const {links} = require('./index'), {BaseClusterWorker} = require('eris-fleet'), fs = require('fs/promises');
let sharder;

module.exports = class BotWorker extends BaseClusterWorker {
    constructor(setup) {
        super(setup);
        
        this.bot.commands = new Map();
        this.links = links;
        this.config = require('./static/config.json')
        sharder=this;

        (async () => {
            // init events
            const events = await fs.readdir('events');
            events.map(async event=>{
                const eventName = event.split(".")[0];
                this.bot.on(eventName, require(`./events/${event}`).bind(null, this));
                console.log(`[Event Loaded] ${eventName}`);
            })
            
            // init commands
            const catagorys = await fs.readdir('commands');
            catagorys.map(async catagory=>{
                const commands = await fs.readdir(`commands/${catagory}`);
                commands.filter(name => name.endsWith(".js"));
                commands.map(command=>{
                    const {commandLogic, help} = require(`./commands/${catagory}/${command}`);
                    const cmd = command.split(".js")[0];
                    sharder.bot.commands.set(`${cmd}_Logic`, commandLogic);
                    sharder.bot.commands.set(`${cmd}_help`, help);
                    sharder.bot.commands.set(`${cmd}_catagory`, catagory);
                    console.log(`[command Loaded] ${cmd}`);
                });
            });
        })();
    }

    shutdown(done) {
        done();
    }
}