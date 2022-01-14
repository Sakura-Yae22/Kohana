import fetch from 'node-fetch'

export const commandLogic = async interaction => {
    const joke = await fetch('https://official-joke-api.appspot.com/random_joke');
    const jokeJSON = await joke.json();

    interaction.createMessage( {"embeds": [{"title": jokeJSON.setup,"description": jokeJSON.punchline,"color": 2717868}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

export const description = "Get a random joke"

export const category = "Fun" 