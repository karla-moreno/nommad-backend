//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');
require('dotenv').config();

//setup
const app = express();
app.use(bodyParser.json());

//// process.env.PORT allows heroku to set port #
var PORT = process.env.PORT || 8080;

//get access token
//TODO: plug in clientId and clientSecret via dotenv
//TODO: add these env. var. to heroku as well
// const token = yelp.accessToken(clientId, clientSecret).then(response => {
//   console.log(response.jsonBody.access_token);
// }).catch(e => {
//   console.log(e);
// });
//
// //
// const client = yelp.client(token);

//search using token
// client.search({
//   term:'Four Barrel Coffee',
//   location: 'san francisco, ca'
// }).then(response => {
//   console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//   console.log(e);
// });

//route
//home page
app.get('/', function(req, res){
  res.send('howdy');
})
//call yelp API and return JSON

//start
app.listen(PORT, function(){
  console.log("server listening on port 3000");
});
