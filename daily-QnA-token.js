// IF TESTING LOCALLY
// require('dotenv').config();
// const token = '';
// const test_token = process.env.test_token;

// IF GOING ONLINE
const token = process.env.token;
const test_token = '';

module.exports = {
    token, test_token
}