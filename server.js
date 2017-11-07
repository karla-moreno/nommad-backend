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

// get access token
// tokens can be revoked so it's best to plug in ID and secret in case
// that occurs to keep app running
// TODO: add these env. var. to heroku as well
const token = yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
  .then(response => {
    console.log('token acquired');
    return response.jsonBody.access_token;
  }).catch(err => {
    console.log(err);
  });

// call yelp API using token and return JSON
// TODO: find and plug in what information is needed for Nommad App
const client = yelp.client(token);
app.get('/api', function(req, res){
  client.search({
    term:'Chilantro',
    location: 'austin'
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
    var results = response.jsonBody.businesses[0].name;
  }).catch(err => {
    console.log(err);
  });
  res.send(results)
});


//start
app.listen(PORT, function(){
  console.log("server listening on port 3000");
});
