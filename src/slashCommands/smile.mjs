export const commandLogic = async interaction => {
    
    const smile = await fetch('https://purrbot.site/api/img/sfw/smile/gif');
    const smileJSON = await smile.json();


    interaction.createMessage( {
        "embeds": [{
            "title": `${interaction.member.user.username} smiled`,
            "color": 2717868,
            "image": {
                "url": smileJSON.link
            }
        }]
    }).catch(err => {});
}

export const description = "Smile once in a while"

export const category = "Emotions" 