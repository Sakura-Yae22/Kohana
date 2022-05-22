import { oblivionQuotes } from '../resources/oblivionQuotes.mjs'
export const commandLogic = async interaction => {
    interaction.createMessage({
        "embeds": [{
            "title": oblivionQuotes[Math.floor(Math.random() * oblivionQuotes.length)],
            "color": 2717868
        }]
    }).catch(err => {});
}

export const description = "Bite someone"

export const category = "Fun" 