//This file contains variables needed for date & time.

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+" UTC";
let date_time = date+' '+time;
let update_deployed = 'The bot is now online. Updates may have been deployed.'+' '+date_time

module.exports = {
    update_deployed, date_time
}