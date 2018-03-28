// app.js
var config = require('./config.js');
var prompt = require('prompt');
var Twitter = require('twitter');
var T = new Twitter(config);

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
