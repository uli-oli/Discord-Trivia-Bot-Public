module.exports = {
    name: "date",
    description: "Displays current date and time in UTC",
    execute (message, args){
        let today2 = new Date();
        let date2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
        let time2 = today2.getHours()+":"+today2.getMinutes()+":"+today2.getSeconds()+" UTC";
        let date_time2 = date2+' '+time2;
        message.reply(date_time2);
    }
}