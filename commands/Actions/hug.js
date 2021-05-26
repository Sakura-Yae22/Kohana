module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, getUser,nekolife}=itemsToImport

    
        let mentionedUser = message.content.split(" ")
        if (mentionedUser.length === 1){
            sendMessage(message.channel.id, {
                "embed": {
                    "title": `${(await getUser(mentionedUser[0].replace("<","").replace("@","").replace("!","").replace(">",""))).username} was hugged by ${message.author.username}`,
                    "color": 2717868,
                    "timestamp": new Date().toISOString(),
                    "image": {
                        "url": (await nekolife.sfw.hug()).url
                    }
                }
            })
        }else{
            sendMessage(message.channel.id, "Please mention a user.")
        }
    },
    "help":[
        {"name": "__Usage__","value": "Give someone a hug\n```\n?PREFIX?hug <@user>\n```","inline": true}
    ]
}