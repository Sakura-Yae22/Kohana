module.exports =  async function handleMessage (sharder, interaction) {

    console.log(interaction)
    // switch(interaction.data.name) {
    //     case "test_edit_command":
    //         interaction.createMessage("interaction recieved");
    //         return bot.editCommand(interaction.data.id, {
    //             name: "edited_test_command",
    //             description: "Test command that was edited by running test_edit_command"
    //         });
    //     case "test_delete_command":
    //         interaction.createMessage("interaction recieved");
    //         return bot.deleteCommand(interaction.data.id);
    //     default: {
            return interaction.createMessage("interaction recieved");
        // }
    // }
//     // command logic
//     if (message.attachments.length !== 0) return
//     if (message.author.bot) return
//     if (message.channel.type !== 0) return
//     if (!message.content.toLowerCase().startsWith(sharder.config.botPrefix)) return
    
//     const commands = ((message.content.slice((sharder.config.botPrefix).length).trim()).split(" "));
//     if (!sharder.bot.commands.has(`${commands[0]}_Logic`)) return
    
//     message.content = commands.splice(1).join(" ");    
//     sharder.bot.commands.get(`${commands[0]}_Logic`)({message, sharder})
}