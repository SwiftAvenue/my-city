/**
 * Created by DFAULUS on 8/18/2014.
 */

var mydb = require("./app/queries.js");

var Sequelize = require('Sequelize');
var sequelize = new Sequelize('mycitydb', 'mycity', 'mycity', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432
});

sequelize
    .authenticate()
    .complete(function (err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    });

var models = require("./models");

models.LocalArea.find({where: {id: 21}})
    .success(function (localArea) {
        console.log("Test 1: " + localArea.local_area_name);
    });

models.LocalArea.findAll()
    .success(function (localAreas) {
        localAreas.forEach(function (la) {
            console.log("Test 2: " + la.anotherName);
        });
    });

var myService = require("./app/localAreaServices");

myService.getCaseType()
