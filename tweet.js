const axios = require('axios');
const config = require('./config');
const dotenv = require('dotenv');
const qs = require('querystring');
const Twitter = require('twitter');

var T = new Twitter(config);

// Confirm tweet to user.
function confirmTweet(name, id) {
	
	T.get('statuses/user_timeline', { count: 1 } , function(err, data) {
		data.
	});
	
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
	token: process.env.SLACK_ACCESS_TOKEN,
	channel: id,
	text: 'Tweet sent!',
	attachments: JSON.stringify([{
			// title: `${users.info.name} sent a tweet!`,
			text: `https://twitter.com/${name}/status/${id}`
		}]),
  }));
};

// Create tweet.
const create = (userId, submission) => { 
  T.post('statuses/update', {status: submission.title}, function (err, data, response) {
	  var username = data.user.screen_name;
	  var tweetId = data.id_str;
	  confirmTweet(username, tweetId);
  });
}

module.exports = { confirmTweet, create };
