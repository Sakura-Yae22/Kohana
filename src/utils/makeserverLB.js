const {BaseServiceWorker} = require('eris-fleet'), {query} = require('../index');

module.exports = class ServiceWorker extends BaseServiceWorker {
    constructor(setup) {
        super(setup);
        this.serviceReady();
    }

    async handleCommand(dataSentInCommand) {
        const table = await query((dataSentInCommand.durration=="allTime") ? {text: 'SELECT * FROM users WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]} : {text: 'SELECT * FROM weeklylb WHERE serverid = $1 order by bumps desc fetch first 10 rows only', values: [dataSentInCommand.guildID]});
        const userNames = await Promise.all(await table.map(async user=> await query({text: 'SELECT * FROM userdata WHERE id = $1', values: [user.userid]})))    
        const longestUserNameLength = userNames.sort((a, b) => b[0].username.length - a[0].username.length)[0][0].username.length;

        const userNamesObj = {};
        userNames.map(user=>userNamesObj[user[0].id]=user[0].username)

        const userList = table.map((user, index)=>{
            let userPadding ="";
            for (let i = 0; i < Math.round((longestUserNameLength-userNamesObj[user.userid].length)); i++) userPadding += " ";

            let bumpsPadding ="";
            for (let i = 0; i < Math.round(table[0].bumps.toString().length - user.bumps.toString().length); i++) bumpsPadding += " ";

            return` | ${(index+1)}${(index+1).toString().length==1 ? "  " : " " }| ${userNamesObj[user.userid]}${userPadding} | ${user.bumps}${bumpsPadding} |`
        })


        let userPadding ="";
        for (let i = 0; i < Math.round((longestUserNameLength-4)); i++) userPadding += " ";

        let bumpsPadding ="";
        for (let i = 0; i < Math.round(table[0].bumps.toString().length - 3); i++) bumpsPadding += " ";

        let divider ="";
        for (let i = 0; i < (17+userPadding.length+bumpsPadding.length); i++) divider += "-";
        
        return `\`\`\` | #  | Name${userPadding} | Pts${bumpsPadding} | \n |${divider}|\n${userList.join("\n")}\`\`\``
    }

    shutdown(done) {
        done();
    }
}