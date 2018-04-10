const config = require('./config');
const Twitter = require('twitter');

var T = new Twitter(config);

// Create tweet.
const create = (userId, submission) => { 
  if ( submission.title.length > 280 ) {

  } else {
    T.post('statuses/update', {status: submission.title});
  };
};

module.exports = { create };
