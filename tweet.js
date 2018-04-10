const config = require('./config');
const Twitter = require('twitter');

var T = new Twitter(config);

//Confirm to user that tweet was sent
const confirmTweet = (newTweet) => {
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
		token: process.env.SLACK_ACCESS_TOKEN,
		channel: users.find(userId),
		text: 'Tweet sent!',
		attachments: JSON.stringify([{
			title: `${users.info.name} sent a tweet!`,
			text: newTweet.status,
		}]),
	}))
};

// Create tweet.
const create = (userId, submission) => { 
  T.post('statuses/update', {status: submission.title});
  sendConfirmation(newTweet);
}

module.exports = { create, confirmTweet };
