/**
 * Created by DFAULUS on 8/18/2014.
 */

function getLocalAreas(db, callback) {
    db.query("SELECT id, local_area_name FROM mycity.local_area").success(function (rows) {
        callback(rows);
    });
}

function getCaseTypes(db, callback) {
    db.query("SELECT * FROM mycity.case_type").success(function (rows) {
        callback(rows);
    });
}

function getAllCasesForLocalArea(db, callback) {
    db.query('SELECT * FROM mycity.case where local_area_id = :locAreaId', null, {raw: true}, {locAreaId: 6})
        .success(function (rows) {
            callback(rows);
        });
}

function getAllCaseTypeSummariesForLocalArea(db, localAreaName, callback) {
    var theQuery = "SELECT ct.id as caseTypeId, ct.case_type_name as caseTypeName, count(ct.id) as totalCases " +
        "FROM mycity.local_area la, mycity.case c, mycity.case_type ct " +
        "WHERE la.local_area_name = :locAreaName AND la.id = c.local_area_id AND c.case_type_id = ct.id " +
        "GROUP BY case_type_name, ct.id " +
        "ORDER BY totalCases DESC";

    db.query(theQuery, null, {raw: true}, {locAreaName: localAreaName })
        .success(function (rows) {
            callback(rows);
        });
}

function getAllCaseTypeSummariesForLocalAreaMonthly(db, localAreaName, callback) {
    var theQuery = "SELECT ct.id as caseTypeId, ct.case_type_name as caseTypeName, " +
        "count(ct.id) as totalCases, date_trunc('month', c.date_reported ) as monthReported " +
        "FROM mycity.local_area la, mycity.case c, mycity.case_type ct " +
        "WHERE la.local_area_name = :locAreaName AND la.id = c.local_area_id AND c.case_type_id = ct.id " +
        "GROUP BY ct.case_type_name, ct.id, monthReported ORDER BY totalCases DESC";

    db.query(theQuery, null, {raw: true}, {locAreaName: localAreaName })
        .success(function (rows) {
            callback(rows);
        });
}

function getCaseSummaryForLocalArea(db, localAreaName, callback) {
    var theQuery = "SELECT count(c.case_id), c.date_reported FROM " +
        " mycity.case c, mycity.local_area l" +
        " WHERE c.local_area_id = l.id AND l.local_area_name = :locAreaName " +
        " GROUP BY c.date_reported ORDER BY c.date_reported DESC";

    db.query(theQuery, null, {raw: true}, {locAreaName: localAreaName })
        .success(function (rows) {
            callback(rows);
        });
};

function getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly(db, localAreaName, caseTypeId, callback) {
    var theQuery = "SELECT ct.id as caseTypeId, ct.case_type_name as caseTypeName, " +
        "count(ct.id) as totalCases, date_trunc('month', c.date_reported ) as monthReported " +
        "FROM mycity.local_area la, mycity.case c, mycity.case_type ct " +
        "WHERE la.local_area_name = :locAreaName " +
        "AND ct.id = :caseTypeId " +
        "AND la.id = c.local_area_id AND c.case_type_id = ct.id " +
        "GROUP BY ct.case_type_name, ct.id, monthReported ORDER BY monthReported ASC";

    db.query(theQuery, null, {raw: true}, {locAreaName: localAreaName, caseTypeId: caseTypeId })
        .success(function (rows) {
            callback(rows);
        });
}

function getCaseTypeDetailedInfo(db, caseTypeId, callback) {
    var theQuery = "SELECT 	ct.id as caseTypeId, ct.case_type_name as caseTypeName, " +
        "div.id as divId, div.division_name as divName," +
        "dept.id as deptId, dept.dept_name as deptName " +
        "FROM mycity.case_type ct, mycity.division div, mycity.department dept " +
        "WHERE ct.division_id = div.id AND div.dept_id = dept.id AND ct.id = :caseTypeId";

    db.query(theQuery, null, {raw: true}, {caseTypeId: caseTypeId})
        .success(function (rows) {
            callback(rows);
        });
}

function insertNewCase(db, caseDetails, callback) {
    var theQuery = "INSERT INTO mycity.case2( " +
        "case_id, date_reported, time_reported, case_type_id, local_area_id, " +
        "hundred_block, street, description) " +
        "VALUES (:caseId, :dateReported, :timeReported, :caseTypeId, :localAreaId, :addressBlock, :addressStreet, :description)";

    var moment = require('moment');
    var theDateReported = moment().format('YYYY-MM-DD');
    var theTimeReported = moment().format('hh:mm:ss');
    console.log('Date: ' + theDateReported + '; Time: ' + theTimeReported);

    var theCaseId = moment().format('YYYYMMDD') + moment().format('hhmmssSSS');
    console.log('Case ID: ' + theCaseId);

    db.query(theQuery, null, {raw: true},
        {   caseId: theCaseId,
            dateReported: theDateReported,
            timeReported: theTimeReported,
            caseTypeId: caseDetails.caseTypeId,
            localAreaId: caseDetails.localAreaId,
            addressBlock: caseDetails.addressBlock,
            addressStreet: caseDetails.addressStreet,
            description: caseDetails.caseDescription })
        .success(function (rows) {
            callback(rows);
        });
}

function getNumberOfCasesGroupedByLocalArea(db, callback) {
    var theQuery = "SELECT count(c.id) as numCases, " +
        "ct.id as caseTypeId, ct.case_type_name as caseTypeName, " +
        "la.id as localAreaId, la.local_area_name as localAreaName " +
    "FROM mycity.case c, mycity.local_area la, mycity.case_type ct " +
    "WHERE c.local_area_id = la.id " +
    "AND c.case_type_id = ct.id " +
    "GROUP BY ct.id, ct.case_type_name, la.id, la.local_area_name";

    db.query(theQuery, null, {raw: true})
        .success(function (rows) {
            callback(rows);
        });
}

module.exports.getCaseSummaryForLocalArea = getCaseSummaryForLocalArea;
module.exports.getAllCaseTypeSummariesForLocalArea = getAllCaseTypeSummariesForLocalArea;
module.exports.getAllCaseTypeSummariesForLocalAreaMonthly = getAllCaseTypeSummariesForLocalAreaMonthly;
module.exports.getAllCasesForLocalArea = getAllCasesForLocalArea;
module.exports.getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly = getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly;
module.exports.getLocalAreas = getLocalAreas;
module.exports.getCaseTypes = getCaseTypes;
module.exports.getCaseTypeDetailedInfo = getCaseTypeDetailedInfo;
module.exports.getNumberOfCasesGroupedByLocalArea = getNumberOfCasesGroupedByLocalArea;

module.exports.insertNewCase = insertNewCase;

