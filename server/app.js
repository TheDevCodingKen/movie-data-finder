// Import modules
const express = require('express');
const axios = require('axios').default; // axios.<method> will now provide autocomplete and parameter typings
const logger = require('morgan');

// Create Express application object
const app = express();

// Apply Morgan to log each request using the pre-defined 'dev' format
app.use(logger('dev'));

// Create a counter for middleware
let requestCount = 0;

// Middleware function
app.all('/', function(req, res, next) {
    requestCount++
    console.log('Request Number: ' + requestCount)
    next();
});

// Implement use of environment variables
require('dotenv').config();

// Define movie data cache variable
let movieData = [];

// Route handler
app.get('/', function routeHandler(req, res){
    console.log("Full Requested URL Path: ", req.url);
    console.log("Query: ", req.query);
    // Check movie data cache, via IMDb ID, for query response
    if (Object.keys(req.query)[0] == "i") {
        console.log("Checking cache for IMDb ID query");
        function checkIMDbID(movieObject){
            return movieObject.imdbID == req.query.i;
        }
        let foundMovie = movieData.find(checkIMDbID);
        if (foundMovie == undefined) {
            // Use Axios API to fulfill GET request
            console.log("Sending Axios GET Request for data");
            axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
            .then(function(response) {
                console.log("Movie Title: ", response.data.Title);
                console.log("IMDb ID: ", response.data.imdbID);
                console.log("Response Status: ", response.status);
                console.log("Status Text: ", response.statusText);
                console.log("movieData cache before: ", movieData);
                let responseObject = {
                    Title: response.data.Title,
                    imdbID: response.data.imdbID
                };
                movieData.push(responseObject);
                console.log("movieData cache after: ", movieData);
                // Make Axios API respond with data object
                res.send(response.data);
            })
            .catch(function(error){
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error: ', error.message);
                    }
                    console.log(error.config);
            });
            } else {
            // Make Axios API respond with data object
            res.send(foundMovie);
            }
    // Check movie data cache, via Movie Title, for query response
    } else {
        console.log("movieData:", movieData);
        console.log("Checking cache for movie title query");
        function checkMovieTitle(movieObject){
            return movieObject.Title == req.query.Title;
        }
        let foundMovie = movieData.find(checkMovieTitle);
        if (foundMovie == undefined) {
        // Use Axios API to fulfill GET request
            console.log("Sending Axios GET Request for data");
            axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
            .then(function(response) {
                console.log("Movie Title: ", response.data.Title);
                console.log("IMDb ID: ", response.data.imdbID);
                console.log("Response Status: ", response.status);
                console.log("Status Text: ", response.statusText);
                console.log("movieData cache before: ", movieData);
                let responseObject = {
                    Title: response.data.Title,
                    imdbID: response.data.imdbID
                };
                movieData.push(responseObject);
                console.log("movieData cache after: ", movieData);
                // Make Axios API respond with data object
                res.send(response.data);
            })
            .catch(function(error){
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    // console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error: ', error.message);
                    }
                    console.log(error.config);
            })
        } else {
            // Make Axios API respond with data object
            res.send(foundMovie);
        }
    };
});
app.get('*', function(req, res){
    res.end('No Page Found');
});

// Export the Express application
module.exports = app;