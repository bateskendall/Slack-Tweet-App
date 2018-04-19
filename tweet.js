const axios = require('axios');
const config = require('./config');
const dotenv = require('dotenv');
const qs = require('querystring');
const Twitter = require('twitter');

var T = new Twitter(config);

// Confirm tweet to user.
function confirmTweet(id, newTweet) {
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
	token: process.env.SLACK_ACCESS_TOKEN,
	channel: id,
	text: 'Tweet sent!',
	attachments: JSON.stringify([{
			// title: `${users.info.name} sent a tweet!`,
			text: T.get('/statuses/user_timeline.json', { count: 1 });,
		}]),
  }));
};

// Create tweet.
const create = (userId, submission) => { 
  T.post('statuses/update', {status: submission.title});
  confirmTweet(userId, submission.title);
}

module.exports = { confirmTweet, create };
