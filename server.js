// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
require('dotenv').config();

// setup
const app = express();
app.use(bodyParser.json());

// allows response to be shared
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//// process.env.PORT allows heroku to set port #
var PORT = process.env.PORT || 8080;


// routes
// home page
app.get('/', function(req, res){
  res.send('howdy');
})

var handleClientAction = (res, promise) => {
	promise.then(response => {
			res.json(response.jsonBody);
	}).catch(e => {
			res.json(e);
	});
}

// get access token
// tokens can be revoked so it's best to plug in ID and secret in case
// that occurs to keep app running
const yelpClientPromise = yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
	.then(res => {
    console.log('token acquired');
		return yelp.client(res.jsonBody.access_token);
	}).catch(e => {
		console.log(e);
		res.status(500).send('error retrieving token');
	});

// JSON response route
// call yelp API using token and return JSON
app.get('/api/:zip', (req, res) => {
  yelpClientPromise.then(client => {
    handleClientAction(res, client.search({
      term:'foodtrucks',
      location: req.params.zip,
      radius: 1000
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('error retrieving data from Yelp');
  });
});

//start
app.listen(PORT, function(){
  console.log(`server listening on ${PORT}`);
});
