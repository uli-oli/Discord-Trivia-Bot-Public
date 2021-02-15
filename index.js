const Discord = require('discord.js');
const bot = new Discord.Client();
const {token} = require("./daily-QnA-token.js");
const {test_token} = require("./daily-QnA-token.js");
const {message_responses} = require("./dailyArray.js");
const daily_answers_helmet = '700129455078637638'
const bot_annnouncements_helmet = '717275782283657216';
const bot_testing_personal = '700090363783675954';
const console_log_channel = '719307505918017586';
const this_bot_id = '700082110094114836';
const osb_id = '303730326692429825';
const bso_id = '729244028989603850'; 
const PREFIX ='.';
const reminder_role = "<@&746915443234701402>"
const cant_pvm_9444 = "<@205501433636847617>"
const reminder_message = `${reminder_role} the bot has restarted, send your daily message in <#${daily_answers_helmet}> to restart the reminder timer.\n If you would like the reminder role send ${cant_pvm_9444} a message`

let {update_deployed} = require("./date-time.js");
let {date_time} = require("./date-time.js");
let {date_time2} = require("./commands/date.js")

bot.commands = new Discord.Collection();

const fs = require('fs'); //file system
const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of command_files){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// tolowercase so that message content ignores cases may be useful
// check for weekend boost
// gmt+1 for weekend boost

bot.on('ready', () => {
    console.log(`\nThis bot is online! ${date_time}`);
    if (test_token == ""){
        bot.channels.cache.get(bot_annnouncements_helmet).send(update_deployed);
        bot.channels.cache.get(bot_annnouncements_helmet).send(reminder_message);
        bot.channels.cache.get(bot_testing_personal).send(update_deployed);
    }
});

bot.on("message", (message) => {
    if(message.author.id == this_bot_id || message.content == ""){
      return;
    }
    if(message.content.includes("Diango asks")){
        let message_array = message.content.split("...** ");
        let q_given = message_array[1];
        if(message_responses[q_given]){
            message.channel.send(message_responses[q_given]);
        }
        else{
            message.channel.send("I don't know. Yet...");
            message.channel.send(`The question asked was \`${q_given}\``);
        }
    }
    else if(message_responses[message.content]){
        message.channel.send(message_responses[message.content]);
    }
    else{
        if (message.content.startsWith(PREFIX)){
            let args = message.content.toLowerCase().split(PREFIX);
            let cmd_args = args[1].split(" ");
            console.log(`\n${date_time2}`)
            console.log(`${message.content} from ${message.author.username} #${message.author.discriminator}`);
            console.log(cmd_args);
            switch(cmd_args[0]){
                case 'test':
                    message.reply("Test completed. Systems functioning.");
                    break;
                
                case 'gamble':
                    bot.commands.get("gamble").execute(message, args);
                    break;

                case 'date':
                    bot.commands.get("date").execute(message, args);
                    break;

                case 'weather':
                    bot.commands.get("weather").execute(message, cmd_args);
                    break;

                case 'help':
                    bot.commands.get("help").execute(message, args);
                    break;
                case 'beta':
                    // Not testing anything currently
                    break;
            }
        }
        else if (message.content.startsWith("+") || message.content.startsWith("=")){
            let bot_prefix = ""
            if(message.content.startsWith("+")) bot_prefix = "+";
            else if(message.content.startsWith("=")) bot_prefix = "=";
            let args = message.content.toLowerCase().split(bot_prefix);
            switch(args[1]){
                case 'daily':
                    bot.commands.get("daily").execute(message, args);
                    break;
                    
                case 'remind':
                    bot.commands.get("remind").execute(message, args);
                    break;
            }
        }
    }
});

bot.login(token);
// bot.login(test_token);