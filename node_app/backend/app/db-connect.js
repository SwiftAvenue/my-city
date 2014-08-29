/**
 * Created by DFAULUS on 8/18/2014.
 */

var dbConfig = require('./../config/database');

// Return the connection object to mycity database
function connectToDb() {
    var Sequelize = require('Sequelize');
    var db = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPassword, {
        dialect: 'postgres',
        host: dbConfig.dbHost,
        port: dbConfig.dbPort
    });

    db
        .authenticate()
        .complete(function (err) {
            if (!!err) {
                console.log('Unable to connect to the database:', err)
            } else {
                console.log('Connection has been established successfully.')
            }
        });
    return db;
};

module.exports.connectToDb = connectToDb;

