const {BaseServiceWorker} = require('eris-fleet');
const addPadding = (...args) => import('../utils/addPadding.mjs').then(({default: addPadding}) => addPadding(...args));

export class ServiceWorker extends BaseServiceWorker {
    constructor(setup) {
        super(setup);
        this.serviceReady();
    }

    async handleCommand(dataSentInCommand) {
        const table = await this.ipc.command("db", (dataSentInCommand.durration=="allTime") ? {text: 'SELECT * FROM users WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]} : {text: 'SELECT * FROM weeklylb WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]}, true);
        
        const longestUserNameLength = [...table].sort((a, b) => b.username.length - a.username.length)[0].username.length;
        
        const userNamesObj = {};
        table.map(user => {userNamesObj[user.userid]=user.username})
                
        const userList = table.map((user, index) => ` | ${(index+1)}${(index+1).toString().length==1 ? "  " : " " }| ${userNamesObj[user.userid]}${addPadding(longestUserNameLength-userNamesObj[user.userid].length, " ")} | ${user.bumps}${addPadding(table[0].bumps.toString().length - user.bumps.toString().length, " ")} |`)
        
        const userPadding = addPadding(longestUserNameLength - 4, " ");
        const bumpsPadding = addPadding(table[0].bumps.toString().length - 3, " ");
        
        return `\`\`\` | #  | Name${userPadding} | Pts${bumpsPadding} | \n |${addPadding(17+userPadding.length+bumpsPadding.length, "-")}|\n${userList.join("\n")}\`\`\``
    }

    shutdown(done) {
        done();
    }
}
