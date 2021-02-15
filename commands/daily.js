// Currently developing a reminder system. The bot will remind you when you can do your next daily.
// Add a system that reminds you even after bot has shut down. Store time to wait in a JSON file?

let reminder_array = [];

module.exports = {
    name: "daily",
    description: "Starts a countdown timer. 12 or 4 hours by default.",
    execute (message, args){
        const osb_id = '303730326692429825';
        const osb_name = "Old School Bot";
        const bso_id = '729244028989603850';
        const bso_name = "Bot School Old";
        let Discord = require('discord.js')
        let channel = message.channel
        let filter = m => (m.author.id == osb_id || m.author.id == bso_id);
        let collector = message.channel.createMessageCollector(filter, {time: 15000});
        let counter = 0;
        let case_number = 0;
        let bot_determiner = 1
        let ms_to_wait = 0;
        let sec_to_wait = 0;
        let min_to_wait = 0;
        let hrs_to_wait = 0;
        let time_to_wait = 0;
        let secs = 0;
        let mins = 0;
        let hours = 0;
        let bot_name = osb_name;
        let default_hours = 12;
        let test_timer = 1000 * 5; //5 seconds
        let daily_timer = 1000 * 60 * 60 * 12; //12 hours
        let daily_message = '`+daily`';
        let user = `${message.author.username} #${message.author.discriminator}`;
        let user_reminder = `${message.author.username} #${message.author.discriminator} ${message.content.toLowerCase()}`;
        // let {date_time2} = require("./date.js");
        // date_time2 doesn't work as intended currently
        let today3 = new Date();
        let date3 = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+today3.getDate();
        let time3 = today3.getHours()+":"+today3.getMinutes()+":"+today3.getSeconds()+" UTC";
        let date_time3 = date3+' '+time3;

        function array_remover(){
            for(let i = 0; i < reminder_array.length; i++){
                if(reminder_array[i] == user_reminder){
                    console.log(`Removing ['${reminder_array[i]}'] from reminder array.`);
                    reminder_array.splice(i, 1);
                    console.log(`\n${date_time3}`);
                    console.log(`Current reminders: ${reminder_array.length}`);
                    console.log(reminder_array);
                }
            }
        }

        console.log(`\n${date_time3}`);
        console.log(user_reminder);
        if(reminder_array.includes(user_reminder)){
            console.log("Reminder has already been intialized previously.");
            message.reply("Reminder has already been intialized previously.")
            console.log(`Current reminders: ${reminder_array.length}`);
            console.log(reminder_array);
            return;
        }
        else if(!reminder_array.includes(user_reminder)){
            reminder_array.push(user_reminder);
            console.log(`Current reminders: ${reminder_array.length}`);
            console.log(reminder_array);
        }

        collector.on('collect', col => {
            let col_msg_splitter = col.content.split("...** ");
            console.log(`Collected message from ${col.author.username} #${col.author.discriminator}: '${col_msg_splitter[1]}'`);
            if (col.author.id == bso_id){
                bot_determiner = 2;
                bot_name = bso_name;
                daily_timer = 1000 * 60 * 60 * 4; //4 hours
                default_hours = 4;
                daily_message = '`=daily`'
            }
            counter++;
            if (counter == 3) collector.stop()
            // Case where a question is asked
            if (col.content.includes("Diango asks")){
                // console.log("Daily question asked.");
                case_number = 1;
                message.reply(`I will remind you do to your daily in ${default_hours} hours.`);
                collector.stop();
            }
            // Case where a question is not asked
            else if (col.content.includes("Diango says")){
                // console.log("Daily question was not asked.");
                case_number = 2;
                time_to_wait = col.content.split("daily in ");
                time_splitter = time_to_wait[1].split(" ");
                message.reply(`I will remind you do to your daily in ${time_to_wait[1]}`);
                // console.log(time_splitter)
                // console.log(`Length of time_splitter is ${time_splitter.length}`)
                // With hours
                if (time_splitter[1].startsWith("hour")){
                    hours = Number(time_splitter[0]);
                    hrs_to_wait = Number(time_splitter[0]);
                    // With minutes & hours
                    if(time_splitter.length >= 3 && time_splitter[3].startsWith("minute")){
                        mins = Number(time_splitter[2]);
                        min_to_wait = Number((hrs_to_wait * 60)) + Number(time_splitter[2]);
                        // With seconds & minutes & hours
                        if(time_splitter.length == 6 && time_splitter[5].startsWith("second")){
                            secs = Number(time_splitter[4]);
                            sec_to_wait = Number((min_to_wait * 60)) + Number(time_splitter[4]);
                        }
                        // Without seconds but with hours
                        else{
                            sec_to_wait = Number((min_to_wait * 60))
                        }
                    }
                    // Without minutes but with seconds & hours
                    else if(time_splitter.length >= 3 && time_splitter[3].startsWith("second")){
                        secs = Number(time_splitter[2]);
                        min_to_wait = Number((hrs_to_wait * 60))
                        sec_to_wait = Number((min_to_wait * 60)) + Number(time_splitter[2]);
                    }
                    // Without minutes & seconds but with hours
                    else{
                        min_to_wait = Number((hrs_to_wait * 60))
                        sec_to_wait = Number((min_to_wait * 60))
                    }
                    ms_to_wait = Number(sec_to_wait) * 1000;
                }
                // Without hours but with minutes
                else if (time_splitter[1].startsWith("minute")){
                    mins = Number(time_splitter[0]);
                    min_to_wait = Number(time_splitter[0]);
                    // With minutes & seconds but without hours
                    if(time_splitter.length >= 3 && time_splitter[3].startsWith("second")){
                        secs = Number(time_splitter[2]);
                        sec_to_wait = Number((min_to_wait * 60)) + Number(time_splitter[2]);
                    }
                    // Without hours & seconds but with minutes
                    else{
                        sec_to_wait = Number((min_to_wait * 60))
                    }
                    ms_to_wait = Number(sec_to_wait) * 1000;
                }
                // Without hours & minutes but with seconds
                else if (time_splitter[1].startsWith("second")){
                    secs = Number(time_splitter[0]);
                    sec_to_wait = Number(time_splitter[0]);
                    ms_to_wait = Number(sec_to_wait) * 1000; 
                }
                console.log(`${hours} hours, ${mins} minutes, ${secs} seconds = ${ms_to_wait} milliseconds`);
                collector.stop();
            }
        });
        collector.on('end', collected => {
            // console.log("Messages collected: " + collected.size);
            // Case where a question was asked
            if (case_number == 1){ 
                console.log(`${bot_name} asked ${user} a question.`);
                setTimeout (function() {
                    message.reply(`\`${bot_name}\` **did** ask you a question ${default_hours} hours ago. Your next daily should be ready now. Send ${daily_message}`);
                    console.log(`\n${daily_timer} ms have passed since last trivia question. Should be equivalent to ${default_hours} hours.`);
                    array_remover();
                }, daily_timer);
            }
            // Case where a question was not asked
            else if(case_number == 2){
                console.log(`${bot_name} did not ask ${user} a question.`);
                setTimeout (function() {
                    message.reply(`\`${bot_name}\` **did not** ask you a question ${time_to_wait[1]} ago. Your next daily should be ready now. Send ${daily_message}.`);
                    console.log(`\n${ms_to_wait} ms have passed since last trivia question for ${user}. Should be equivalent to ${time_to_wait[1]}`);
                    array_remover();
                }, ms_to_wait);
            }
            // Case where bot didn't reply
            else{
                let hourly_timer = 1000 * 60 * 60 * 1; //1 hour
                console.log(`${user} sent a daily command. No response from the bot.`);
                setTimeout (function() {
                    message.reply(`You sent ${daily_message} 1 hour ago, but you didn't receive a response from \`${bot_name}.\` Try sending ${daily_message} now.`);
                    console.log(`\n${hourly_timer} ms have passed for ${user}. Should be equivalent to 1 hour.`);
                    array_remover();
                }, hourly_timer);
            }
            collector.stop();
        });
    }
}