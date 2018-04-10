const config = require('./config');
const Twitter = require('twitter');

var T = new Twitter(config);

//Confirm to user that tweet was sent
const confirmTweet = (userId, submission) => {
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
		token: process.env.SLACK_ACCESS_TOKEN,
		channel: userId,
		text: 'Tweet sent!',
		attachments: JSON.stringify([{
			title: `${users.info.name} sent a tweet!`,
			text: submission.title,
		}]),
	}))
};

// Create tweet.
const create = (userId, submission) => { 
  T.post('statuses/update', {status: submission.title});
  confirmTweet(userId, submission);
}

module.exports = { create, confirmTweet };
