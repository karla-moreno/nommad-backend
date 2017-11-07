//TODO: WRITE READ ME
//TODO: add to Nommad App readme

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
require('dotenv').config();

// setup
const app = express();
app.use(bodyParser.json());

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
// TODO: add these env. var. to heroku as well
const yelpClientPromise = yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
	.then(res => {
    console.log('token acquired');
		return yelp.client(res.jsonBody.access_token);
	}).catch(e => {
		console.log(e);
		res.status(500).send('Could not get Yelp Access Token');
	});

// call yelp API using token and return JSON
// TODO: find and plug in what information is needed for Nommad App
app.get('/api', (req, res) => {
  yelpClientPromise.then(client => {
    handleClientAction(res, client.search({
      term:'Chilantro',
      location: 'austin'
    }).then(res => {
      console.log(res.jsonBody.businesses[0].name);
      res.send(res.jsonBody.businesses[0].name);
    }));
  }).catch(err => {
    console.log(err);
    res.status(500).send('Could not get Yelp client');
  });
});


//start
app.listen(PORT, function(){
  console.log(`server listening on ${PORT}`);
});
