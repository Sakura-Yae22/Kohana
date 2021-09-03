module.exports = (length, content) => {
    let padding = ""
    for (let i = 0; i < Math.round(length); i++) padding += content;
    return padding
}