module.exports = {
    name: "remind",
    description: "Create a timed reminder",
    execute (message, args){
        let reminder_message = message.content.substr(8, message.end);

        if (reminder_message == ""){
            message.reply("Type `.help` to learn how to remind");
        }
        else if (reminder_message.search(/[0-9]+(s|m|h|d){1}/) >= 0){
            let time = reminder_message.subtring(0, reminder_message.search(" ")).toLowerCase();
            let output_message = reminder_message.subtring(reminder_message.search(" ") + 1, reminder_message.end);
            let actual_time = 0;
            let magnitudes = time.split(/s|m|h|d/).filter(word => word != "");
            let types_of_time = time.split(/[0-9]+/).filter(word => word != "");

            if ((magnitudes.length == types_of_time.length) && (-1 == time.search(/a|b|c|e|f|g|i|j|k|l|n|o|p|q|r|t|u|v|w|x|y|z/))){
                for (i = 0; i < magnitudes.length; i++){
                    switch(types_of_time[i]){
                        case 's':
                            actual_time += magnitudes[i] * 1000;
                            break;
                        
                        case 'm':
                            actual_time += magnitudes[i] * 1000 * 60;
                            break;

                        case 'h':
                            actual_time += magnitudes[i] * 1000 * 60 * 60;
                            break;

                        case 'd':
                            actual_time += magnitudes[i] * 1000 * 60 * 60 * 24;
                            break;

                        default:
                            //nothing
                    }
                }
                message.channel.send(`${message.author}, your reminder has been set for ` + msToTime(actual_time));
                let d = new Date();
                let reminder = {
                    author: message.author,
                    reminder_message: output_message,
                    start_time: d.getTime(),
                    time_to_wait: actual_time
                };
                
                reminders.push(reminder);
                reminders.sort(function(a,b){return (a.start_time + a.time_to_wait) - (b.start_time + b.time_to_wait)});
                
                setTimeout(function(){
                    console.log("Reminder worked");
                    reminds.shift();
                    message.reply("This is a reminder to" + output_message, {
                        tts: true
                    });
                }, actual_time);
            }
            else{
                message.reply('You formatted the time incorrectly it should only have numbers and the letters s, m, h and d and it should look like: \'4d20h30s\' or \'2h30m\' ');
            }
        }
        else{
            message.reply('You probably formatted your reminder wrong, type .help to learn how to make reminders!');
        }
    }
}