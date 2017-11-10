# Nommad Back-end Proxy Server

## Summary
Back-end server for [Nommad App](https://nommad-app.firebaseapp.com/) to access the Yelp Fusion API, version 3.0. This proxy server uses express, body-parser, yelp-fusion NPM package, and .env files. This server receives the request from the Nommad App, and sends it to the yelp client to receive JSON data. Then, it grabs the data based on the location given when the user types in a city name, or a zip code from the URL parameter. It searches for food trucks in a 1 meter radius. We have the JSON data deployed on Heroku as our method of grabbing the data instead of directly grabbing it from the Yelp Fusion Api due to API restrictions. You can find the link to the JSON data [here](https://nommad-backend.herokuapp.com/api/78705) and if you want to change the location of where the data is coming from, change the zip code parameter after /api/.

## Technologies Used for Server

- [Yelp Fusion](https://www.npmjs.com/package/yelp-fusion)
- [Express](https://www.npmjs.com/package/express)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [JavaScript(ES6)](http://es6-features.org/#Constants)
- [Heroku](https://www.heroku.com)
