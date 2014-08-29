/**
 * Created by DFAULUS on 8/18/2014.
 */
var dbConnect = require("./app/db-connect.js");
var mydb = dbConnect.connectToDb();

var models = require("./models");

models.LocalArea.find({where: {id: 21}})
    .success(function (localArea) {
        // console.log("Test 1: " + localArea.local_area_name);
    });

models.LocalArea.findAll()
    .success(function (localAreas) {
        localAreas.forEach(function (la) {
            // console.log("Test 2: " + la.anotherName);
        });
    });

var myService = require("./app/localAreaServices");

myService.getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly(mydb, 'Downtown', 31,
    function (results) {
        // console.log(results);
    });

myService.getAllCaseTypes(mydb, function (results) {
    // console.log(results);
});

myService.getCaseTypeDetailedInfo(mydb, 31, function (results) {
    console.log(results);
});
