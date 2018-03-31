require('dotenv').config();

const axios = require('axios');
const debug = require('debug')('slash-command-template:tweet');
const qs = require('querystring');
const config = require('./config');
const users = require('./users');
const Twitter = require('twitter');

var T = new Twitter(config);

//Send tweet confirmation.
const sendConfirmation = (tweet) => {
	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
		token: process.env.SLACK_ACCESS_TOKEN,
		channel: tweet.userId,
		text: 'Tweet sent!',
		attachments: JSON.stringify([{
			title: `${tweet.userId} sent a tweet!`,
			text: tweet.text,
			fields: [{
				title: 'Tweet',
				value: tweet.title,
			}],
		}]),
	})).then((result) => {
		debug('sendConfirmation: %o', result.data);
		}).catch((err) => {
			debug('sendConfirmation error: %o', err);
			console.error(err);
		});
};

// Create tweet.
const create = (userId, submission) => {
	
	const tweet = {status: submission.title};
	
	// post tweet
	T.post('statuses/update', tweet, function(err, data, response) {
		// if unsuccessful, log error message
		if(err){ console.log(err[0].message); }
		// else display success message
		else{
			sendConfirmation(tweet);
			return tweet;
		};
	});
}

module.exports = { create, sendConfirmation };
