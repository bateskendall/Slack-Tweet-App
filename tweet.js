const config = require('./config');
const Twitter = require('twitter');

var T = new Twitter(config);

// Create tweet.
const create = (userId, submission) => { 
  if ( submission.title.length > 280 ) {
    	axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
        token: process.env.SLACK_ACCESS_TOKEN,
        channel: userId,
        text: 'Your tweet is too long. Please keep your tweets under 280 characters.'
  } else {
    T.post('statuses/update', {status: submission.title});
  };
};

module.exports = { create };
