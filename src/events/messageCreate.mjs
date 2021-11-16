// require disboard utils
import disbord from '../utils/disbord.mjs'
import checkExpiredservers from '../utils/checkExpiredservers.mjs'

export default async function handleMessage (sharder, message) {
    // disboard
    checkExpiredservers(sharder, false); 
    if (message.author.id == "302050872383242240") return disbord(message, sharder) 
}