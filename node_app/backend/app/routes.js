/**
 * Created by DFAULUS on 8/19/2014.
 */

// TODO: Should not have dependencies to db stuff - create separate class to do actual business logic
module.exports = function (app, router, appServices, mydb) {

// middleware to use for all requests
// Note: Using middleware like this can be very powerful. We can do validations to make sure
// that everything coming from a request is safe and sound. We can throw errors here
// in case something is wrong. We can do some extra logging for analytics or any
// statistics we’d like to keep.
    router.use(function (req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function (req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

// more routes for our API will happen here

// routes for localAreas
    router.route('/localAreas')
        .get(function (req, res) {
            appServices.getLocalAreas(mydb, function (results) {
                res.json(results);
            });
        });

    // routes for caseTypes
    router.route('/caseTypes')
        .get(function (req, res) {
            appServices.getAllCaseTypes(mydb, function (results) {
                res.json(results);
            });
        });

    router.route('/caseTypes/:caseTypeId')
        .get(function (req, res) {
            appServices.getCaseTypeDetailedInfo(mydb, req.params.caseTypeId, function (results) {
                res.json(results);
            });
        });

    router.route('/case')
        .post(function (req, res) {
            console.log('POST: Adding a new case with details: ');
            console.log(req.body);
            appServices.addNewCase(mydb, req.body,
                function (results) {
                    res.json(results);
                });
        });

    router.route('/case/summary/:localAreaName')
        .get(function (req, res) {
            appServices.getAllCaseTypeSummariesForLocalArea(mydb, req.params.localAreaName,
                function (results) {
                    res.json(results);
                });
        });

    router.route('/case/summary/:localAreaName/m')
        .get(function (req, res) {
            appServices.getAllCaseTypeSummariesForLocalAreaMonthly(mydb, req.params.localAreaName,
                function (results) {
                    res.json(results);
                });
        });

    router.route('/case/summary/:localAreaName/:caseTypeId/m')
        .get(function (req, res) {
            appServices.getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly(mydb,
                req.params.localAreaName,
                req.params.caseTypeId,
                function (results) {
                    res.json(results);
                });
        });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
    app.use('/api', router);
};
