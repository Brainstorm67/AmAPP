const Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
//const routes = require('./routes');
const mongoose = require("mongoose");
const morgan = require('morgan');
const passport = require('passport');
const logger = require('./logger.js');

const config = require('./config');

const app = express();

mongoose.Promise = Promise;
//mongoose.connect('mongodb://127.0.0.1:27017/AmAPP');
/*
 mongoose.connection.collections['portes'].drop( function(err) {
 console.log('collection dropped');
 });
*/

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

// express app will use body-parser to get data from POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


// Set port
const port = config.port;

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.get('/', function (req, res) {
    logger.debug('Debug statement');
    logger.info('Info statement');
    res.send('Hello World!');
});

app.use(function(req, res, next){
    logger.error('404 page requested');
    res.status(404).send('This page does not exist!');
});

// Define a prefix for all routes
// Can define something unique like MyRestAPI
// We'll just leave it so all routes are relative to '/'
//app.use('/', routes);

// Start server listening
app.listen(port, function(){
    logger.info('RESTAPI listening on port: ' + port);
});
