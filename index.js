// app.js
require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const tweet = require('./tweet');
const debug = require('debug')('slash-command-template:index');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<h2>TweetBot running.</p>');
});

/*
 * Endpoint to receive /tweet slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/commands', (req, res) => {
	// extract the verification token, slash command text,
	// and trigger ID from payload
	const { token, text, trigger_id } = req.body;
	
	// check that the verification token matches expected value
	if (token === process.env.SLACK_VERIFICATION_TOKEN) {
		// create the dialog payload - includes the dialog structure, Slack API token,
		// and trigger ID
		const dialog = {
			token: process.env.SLACK_ACCESS_TOKEN,
			trigger_id,
			dialog: JSON.stringify({
				title: 'Compose new Tweet',
				callback_id: 'submit-tweet',
				submit_label: 'Tweet',
				elements: [{
					label: 'What\'s happening?',
					type: 'text',
					name: 'title',
					value: text,
					hint: '',
				}],
			})
		};
		
		// Open dialog
		axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
		.then((result) => {
			debug('dialog.open: %o', result.data);
			res.send('');
		}).catch((err) => {
			debug('dialog.open call failed: %o', err);
			res.sendStatus(500);
			});
	} else {
		debug('Verification token mismatch');
		res.sendStatus(500);
	};
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a Helpdesk ticket
 */
app.post('/interactive-component', (req, res) => {
	const body = JSON.parse(req.body.payload);
	
	// check that the verification token matches expected value
	if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
		debug(`Form submission received: ${body.submission.trigger_id}`);
		
		// immediately respond with a empty 200 response to let
		// Slack know the command was received
		res.send('');
		
		// create tweet
		tweet.create(body.user.id, body.submission);
	} else {
		debug('Token mismatch');
		res.sendStatus(500);
	};
});

app.listen(process.env.PORT, () => {
	console.log('App listening on port ' + process.env.PORT);
});
