const config = require('./config');
const qs = require('querystring');
const Twitter = require('twitter');

var T = new Twitter(config);

function confirmTweet(id, newTweet) {
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: process.env.SLACK_ACCESS_TOKEN,
		channel: users.find(userId),
		text: 'Tweet sent!',
		attachments: JSON.stringify([{
			title: `${id} sent a tweet!`
    }]);
  }));
}

// Create tweet.
const create = (userId, submission) => { 
  T.post('statuses/update', {status: submission.title});
  confirmTweet(userId, submission.title);
}

module.exports = { create };
