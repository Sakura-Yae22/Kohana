const {BaseServiceWorker} = require('eris-fleet'), {query} = require('../index');

module.exports = class ServiceWorker extends BaseServiceWorker {
    constructor(setup) {
        super(setup);
        this.serviceReady();
    }

    async handleCommand(dataSentInCommand) {
        const table = await query((dataSentInCommand.durration=="allTime") ? {text: 'SELECT * FROM users WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]} : {text: 'SELECT * FROM weeklylb WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]});
        let gg = await table.map((user, index)=> ` | ${(index+1)}${(index+1).toString().length==1 ? "  " : " " }| ${user.username} | ${user.bumps} |`)
        return `\`\`\` | #  | Name               | Pts | \n |-------------------------------|\n${gg.join("\n")}\`\`\``
    }

    shutdown(done) {
        done();
    }
}