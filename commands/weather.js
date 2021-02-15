const weather = require('weather.js')
const {PREFIX} = require("../index.js");
// const PREFIX = '.';
const Discord = require('discord.js');

module.exports ={
    name: "weather",
    description: "Command to search for weather",
    execute(message, args){
        try{
            // message.channel.send("Weather test message.");
            let weather_message = message.content.toUpperCase();
            // console.log(`Message content: ${message.content}'`);
            weather.find({search: args.join(" "), degreeType: "F"}, function(error, result){
                // console.log(weather.find);
                // console.log(args)
                if(error){
                    console.log(error);
                    message.channel.send(error);
                    return message.channel.send(error);
                }
                else if(args.length <= 1){
                    // console.log(args);
                    console.log("No location set");
                    return message.reply("Please specify a location");
                }
                else if(result == undefined || result.length == 0){
                    console.log("Invalid location");
                    return message.reply("Invalid location");
                }
                /*
                else {
                    // console.log("Valid location");
                    // console.log(`${message.content} from ${message.author.username} #${message.author.discriminator}`);
                }
                */
                // console.log(result);
                // console.log(result[0]);
                let current = result[0].current;
                let location = result[0].location;
                // const weather_info = new Discord.RichEmbed()
                const weather_info = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`Weather forecast for ${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .setColor(0x00AE86) //choose a color
                    .addField('Timezone', `UTC${location.timezone}`, true)
                    // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
                    .addField('Degree Type', location.degreetype, true)
                    // This is the field that shows the degree type, and is inline
                    .addField('Temperature', `${current.temperature}°`, true)
                    .addField('Feels Like', `${current.feelslike}°`, true)
                    .addField('Winds', current.winddisplay, true)
                    .addField('Humidity', `${current.humidity}%`, true);
                if(error){
                    console.log("error: " + error);
                    // console.log({weather_info});
                }
                try{
                    // message.channel.send(weather_info);
                    message.reply(weather_info);
                }
                catch(error){
                    console.error(error)
                }
            });
        }
        catch(error){
            console.error(error);
        }
    }
}