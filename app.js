// app.js
const config = require('./config.js');
const prompt = require('prompt');
const Twitter = require('twitter');
var T = new Twitter(config);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// get input from user
prompt.start();
prompt.get(['tweet'], function(err, result) {

	// store user input
	var newTweet = { status: result.tweet };
	
	// post tweet
	T.post('statuses/update', newTweet, function(err, data, response) {
		// if unsuccessful, log error message
		if(err){ console.log(err[0].message); }
		// else display success message
		else{ console.log('Tweet successfully posted!'); }
	});
});