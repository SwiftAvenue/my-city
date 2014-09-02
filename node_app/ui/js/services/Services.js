var services = angular.module('myCity.services', ['ngResource']);

services.factory('localAreaServices', function ($resource, $q) {

    var baseUrl = 'http://localhost:9080/api/';
    var localAreaListResource = $resource(baseUrl + 'localAreas', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );
    var caseTypesLocalAreaResource = $resource(baseUrl + 'case/summary/:localArea', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );
    var caseTypesResource = $resource(baseUrl + 'caseTypes', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );
    var caseResource = $resource(baseUrl + 'case', {},
        {
            save: { method: 'POST' }
        }
    );

    var casesGroupedByLocalAreaResource = $resource(baseUrl + 'case/summary', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );

    var monthlyCaseTypesResource = $resource(baseUrl + 'case/summary/:localArea/m', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );

    var monthlyCaseTypeSummaryForLocalAreaResource = $resource(baseUrl + 'case/summary/:localArea/:caseTypeId/m', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );

    var caseTypeDetailedInfoResource = $resource(baseUrl + 'caseTypes/:caseTypeId', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );

    var caseTypeList = undefined;

    return {
        getLocalAreaList: function () {
            var d = $q.defer();
            localAreaListResource.get({}, function (data) {
                d.resolve(data);
            });
            return d.promise;
        },

        addNewCase: function (newCase) {
            console.log("Adding new case...");
            caseResource.save(newCase);
        },

        getCaseTypes: function () {
            caseTypeList = caseTypesResource.get();
            return caseTypeList;
        },

        getCaseTypesForLocalArea: function (locArea) {
            var d = $q.defer();
            caseTypesLocalAreaResource.get({
                localArea: locArea
            }, function (data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getMonthlyCaseTypesForLocalArea: function (locArea) {
            var d = $q.defer();
            monthlyCaseTypesResource.get({
                localArea: locArea
            }, function (data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getMonthlyCaseTypeSummaryForLocalArea: function (locArea, caseTypeId) {
            var d = $q.defer();
            monthlyCaseTypeSummaryForLocalAreaResource.get({
                localArea: locArea,
                caseTypeId: caseTypeId
            }, function (data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getCaseTypeDetailedInfo: function (caseTypeId) {
            var d = $q.defer();
            caseTypeDetailedInfoResource.get({
                caseTypeId: caseTypeId
            }, function (data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getNumberOfCasesGroupedByLocalArea: function() {
            var d = $q.defer();
            casesGroupedByLocalAreaResource.get({},
                function (data) {
                d.resolve(data);
            });
            return d.promise;
        }


    }
});