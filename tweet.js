const axios = require('axios');
const config = require('./config');
const dotenv = require('dotenv');
const qs = require('querystring');
const Twitter = require('twitter');

var T = new Twitter(config);

// Confirm tweet to user.
function confirmTweet(user, name, id) {
	
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
		token: process.env.SLACK_ACCESS_TOKEN,
		channel: user,
		text: 'Tweet sent! \n https://twitter.com/' + name + '/status/' + id
  }));
};

// Create tweet.
const create = (userId, submission) => { 
	T.post('statuses/update', {status: submission.title}, function (err, data, response) {
		// Get username and id of newly created tweet to include in url to confirm to user.
		var username = data.user.screen_name;
		var tweetId = data.id_str;
		confirmTweet(userId, username, tweetId);
  });
}

module.exports = { confirmTweet, create };