const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = interaction.data.resolved.users.keys().next().value
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant poke yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const ranChance = Number((Math.random() * 1).toFixed(1));        
    const poke = await fetch(ranChance>=0.5 ? 'https://purrbot.site/api/img/sfw/poke/gif' : 'https://nekos.best/api/v1/poke');
    const pokeJSON = await poke.json();

    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users.get(mentionedUserID).username} was poked by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": pokeJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Poke a user"

module.exports.options = [
    {
        "name": "user", 
        "description": "The user to poke",
        "type": 6,
        "required": true,
    }
]

module.exports.category = "Actions" 