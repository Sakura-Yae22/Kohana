module.exports = {
    "commandLogic": async function commandLogic(itemsToImport) {
        let {message, sendMessage, getUser, nekolife}=itemsToImport

        let mentionedUser = message.content.split(" ")
        if (mentionedUser[0].length>10){
            sendMessage(message.channel.id, {
                "embed": {
                    "title": `${(await getUser(mentionedUser[0].replace("<","").replace("@","").replace("!","").replace(">",""))).username} was tickled by ${message.author.username}`,
                    "color": 2717868,
                    "timestamp": new Date().toISOString(),
                    "image": {
                        "url": (await nekolife.sfw.tickle()).url
                    }
                }
            })
        }else{
            sendMessage(message.channel.id, "Please mention a user.")
        }
    },
    "help":[
        {"name": "__Usage__","value": "Tickle someone.\n```\n?PREFIX?tickle <@user>\n```","inline": true}
    ]
}