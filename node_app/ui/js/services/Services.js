var services = angular.module('myCity.services', ['ngResource']);

services.factory('localAreaServices', function ($resource, $q) {

    var baseUrl = 'http://localhost:9080/api/';
    var localAreaListResource = $resource(baseUrl + 'localAreas', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );
    var caseTypesResource = $resource(baseUrl + 'case/summary/:localArea', {},
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

    var localAreaList = undefined;
    var locAreaCaseTypes = undefined;
    var caseTypeDetailedInfo = undefined;

    return {
        getLocalAreaList: function() {
            var d = $q.defer();
            localAreaListResource.get({}, function(data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getCaseTypesForLocalArea: function(locArea) {
            locAreaCaseTypes = caseTypesResource.get({
                localArea : locArea
            });
            return locAreaCaseTypes;
        },

        getMonthlyCaseTypesForLocalArea: function(locArea) {
            var d = $q.defer();
            monthlyCaseTypesResource.get({
                localArea : locArea
            }, function(data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getMonthlyCaseTypeSummaryForLocalArea: function(locArea, caseTypeId) {
            var d = $q.defer();
            monthlyCaseTypeSummaryForLocalAreaResource.get({
                localArea : locArea,
                caseTypeId : caseTypeId
            }, function(data) {
                d.resolve(data);
            });
            return d.promise;
        },

        getCaseTypeDetailedInfo: function(caseTypeId) {
            var d = $q.defer();
            caseTypeDetailedInfoResource.get({
                caseTypeId : caseTypeId
            }, function(data) {
                d.resolve(data);
            });
            return d.promise;
        }


    }
});