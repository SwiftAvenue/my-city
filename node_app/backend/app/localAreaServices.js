/**
 * Created by DFAULUS on 8/23/2014.
 */

var dbService = require("./queries");
var _s = require('underscore.string');   // underscore.string library

function getLocalAreas(mydb, callback) {
    dbService.getLocalAreas(mydb, function (laList) {
        var mappedResults = [];
        laList.forEach(function (la) {
            if (la.local_area_name.toLowerCase() != 'local_area') {
                var mappedLa = {
                    localAreaId: la.id,
                    localAreaName: la.local_area_name
                }
                mappedResults.push(mappedLa);
            }
        });
        callback(mappedResults);
    });
}

function getAllCaseTypes(mydb, callback) {
    dbService.getCaseTypes(mydb, function (ctList) {
        var mappedResults = [];
        ctList.forEach(function (ct) {
            var mappedCt = {
                caseTypeId: ct.id,
                caseTypeName: ct.case_type_name,
                divisionId: ct.division_id
            }
            mappedResults.push(mappedCt);
        });
        callback(mappedResults);
    });
};

function getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly(mydb, laName, ctId, callback) {
    dbService.getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly(mydb, laName, ctId,
        function (ctSummaryList) {
            var mappedResults = [];
            ctSummaryList.forEach(function (ctSummary) {
                var mappedCtSummary = {
                    caseTypeId: ctSummary.casetypeid,
                    caseTypeName: ctSummary.casetypename,
                    totalCases: ctSummary.totalcases,
                    monthReported: formatMonthReported(ctSummary.monthreported)
                };
                mappedResults.push(mappedCtSummary);
            });
            callback(mappedResults);
        });
};

function getAllCaseTypeSummariesForLocalAreaMonthly(mydb, laName, callback) {
    dbService.getAllCaseTypeSummariesForLocalAreaMonthly(mydb, laName,
        function (ctSummaryList) {
            var mappedResults = [];
            ctSummaryList.forEach(function (ctSummary) {
                var mappedCtSummary = {
                    caseTypeId: ctSummary.casetypeid,
                    caseTypeName: ctSummary.casetypename,
                    totalCases: ctSummary.totalcases,
                    monthReported: formatMonthReported(ctSummary.monthreported)
                };
                mappedResults.push(mappedCtSummary);
            });
            callback(mappedResults);
        });
};

function getAllCaseTypeSummariesForLocalArea(mydb, laName, callback) {
    dbService.getAllCaseTypeSummariesForLocalArea(mydb, laName,
        function (ctSummaryList) {
            var mappedResults = [];
            ctSummaryList.forEach(function (ctSummary) {
                var mappedCtSummary = {
                    caseTypeId: ctSummary.casetypeid,
                    caseTypeName: ctSummary.casetypename,
                    totalCases: ctSummary.totalcases
                };
                mappedResults.push(mappedCtSummary);
            });
            callback(mappedResults);
        });
}

function getCaseTypeDetailedInfo(mydb, ctId, callback) {
    dbService.getCaseTypeDetailedInfo(mydb, ctId,
        function (ctDetails) {
            var mappedResults = [];
            ctDetails.forEach(function (ctInfo) {
                var mappedCtSummary = {
                    caseTypeId: ctInfo.casetypeid,
                    caseTypeName: ctInfo.casetypename,
                    divId: ctInfo.divid,
                    divName: ctInfo.divname,
                    deptId: ctInfo.deptid,
                    deptName: ctInfo.deptname
                };
                mappedResults.push(mappedCtSummary);
            });
            callback(mappedResults);
        });
};

function addNewCase(mydb, caseData, callback) {
    dbService.insertNewCase(mydb, caseData,
        function (result) {
            callback(result);
        });
};

function getNumberOfCasesGroupedByLocalArea(mydb, callback) {
    dbService.getNumberOfCasesGroupedByLocalArea(mydb,
        function (caseSummaryList) {
            var mappedResults = [];
            caseSummaryList.forEach(function (caseSummary) {
                var mappedCaseSummary = {
                    numCases: parseInt(caseSummary.numcases),
                    caseTypeId: caseSummary.casetypeid,
                    caseTypeName: caseSummary.casetypename,
                    localAreaId: caseSummary.localareaid,
                    localAreaName: caseSummary.localareaname
                };
                mappedResults.push(mappedCaseSummary);
            });
            callback(mappedResults);
        });
}

function formatMonthReported(monthReportedStr) {
    // A month reported string example: "Sat Dec 31 2011 16:00:00 GMT-0800 (Pacific Standard Time)"
    // returned: 31-Dec-2011
    var elems = _s.words(monthReportedStr);
    return _s.sprintf('%s-%s-%s', elems[2], elems[1], elems[3]);
};

module.exports.getLocalAreas = getLocalAreas;
module.exports.getAllCaseTypes = getAllCaseTypes;
module.exports.getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly = getCaseTypeSummaryForLocalAreaAndCaseTypeMonthly;
module.exports.getCaseTypeDetailedInfo = getCaseTypeDetailedInfo;
module.exports.getAllCaseTypeSummariesForLocalArea = getAllCaseTypeSummariesForLocalArea;
module.exports.getAllCaseTypeSummariesForLocalAreaMonthly = getAllCaseTypeSummariesForLocalAreaMonthly;
module.exports.getNumberOfCasesGroupedByLocalArea = getNumberOfCasesGroupedByLocalArea;

module.exports.addNewCase = addNewCase;
