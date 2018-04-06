const config = require('./config');
const users = require('./users');
const Twitter = require('twitter');

var T = new Twitter(config);

// Create tweet.
const create = (userId, submission) => {
	
	const newTweet = {
		status: submission.title,
		userID: users.find(userId)
	};
	
	// post tweet
	T.post('statuses/update', newTweet, function(err, data, response) {
		// if unsuccessful, log error message
		if(err){ console.log(err[0].message); }
		// else display success message
		else{
			return newTweet;
		};
	});
}
