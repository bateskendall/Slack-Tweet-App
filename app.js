// app.js
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var prompt = require('prompt');

var newTweet = { status: 'sample tweet' }
	
T.post('statuses/update', newTweet, function(err, data, response) {
	// if unsuccessful, log error message
	if(err){
		console.log(err[0].message);
	}
	else{
		console.log('Tweet successfully posted!');
	}
});