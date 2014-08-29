/**
 * Created by DFAULUS on 8/18/2014.
 */

// Based on tutorial in http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');

var dbConnect = require("./app/db-connect.js");
var appServices = require("./app/localAreaServices.js");

var mydb = dbConnect.connectToDb();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var port = process.env.PORT || 8080; 		// set our port
var port = 9080;

var router = express.Router();
require('./app/routes.js')(app, router, appServices, mydb);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
