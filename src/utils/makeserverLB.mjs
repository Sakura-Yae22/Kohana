import addPadding from '../utils/addPadding.mjs'

export default async(table)=>{    
    const longestUserNameLength = [...table].sort((a, b) => b.username.length - a.username.length)[0].username.length;
    
    const userNamesObj = {};
    table.map(user => {userNamesObj[user.userid]=user.username})
            
    const userList = table.map((user, index) => ` | ${(index+1)}${(index+1).toString().length==1 ? "  " : " " }| ${userNamesObj[user.userid]}${addPadding(longestUserNameLength-userNamesObj[user.userid].length, " ")} | ${user.bumps}${addPadding(table[0].bumps.toString().length - user.bumps.toString().length, " ")} |`)
    
    const userPadding = addPadding(longestUserNameLength - 4, " ");
    const bumpsPadding = addPadding(table[0].bumps.toString().length - 3, " ");
    
    return `\`\`\` | #  | Name${userPadding} | Pts${bumpsPadding} | \n |${addPadding(17+userPadding.length+bumpsPadding.length, "-")}|\n${userList.join("\n")}\`\`\``
}