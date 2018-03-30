// config.js
const dotenv = require('dotenv');
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'production') dotenv.load();

module.exports = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
}
