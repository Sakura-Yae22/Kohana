// require disboard utils
const Disbord = require('../utils/disbord'), checkExpiredservers = require('../utils/checkExpiredservers');

export default async function handleMessage (sharder, message) {
    // disboard
    checkExpiredservers(sharder, false); 
    if (message.author.id == "302050872383242240") return Disbord(message, sharder) 
}