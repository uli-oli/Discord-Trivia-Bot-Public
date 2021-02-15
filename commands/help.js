const help_message = `
.help to display this message
.test to see if the bot is working
.date to display the current date & time
.gamble to gamble
`;

module.exports = {
    name: "help",
    description: "Contains the help command and the variables required",
    execute (message, args){
        message.reply("```"+help_message+"```");
    }
}