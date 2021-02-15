module.exports = {
    name: "gamble",
    description: "Game of chance. Rolls from 1-100, 55+ wins.",
    execute (message, args){
        let random_gamble_number = Math.floor(Math.random()*100)+1;
        if(random_gamble_number > 55){
            message.reply('You win! You rolled '+random_gamble_number);
        }
        if(random_gamble_number <= 55){
            message.reply('You lose! You rolled a '+random_gamble_number);
        }
    }
}