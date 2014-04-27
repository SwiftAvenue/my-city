var services = angular.module('myCity.services', ['ngResource']);

services.factory('localAreaServices', function ($resource) {

    var baseUrl = 'http://localhost:7080/mycity/api/';
    var localAreaListResource = $resource(baseUrl + 'localAreas', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );
    var caseTypesResource = $resource(baseUrl + 'cases/area/:localArea', {},
        {
            get: { method: 'GET', isArray: true }
        }
    );

    var localAreaList = undefined;
    var locAreaCaseTypes = undefined;

    return {
        getLocalAreaList: function() {
            localAreaList = localAreaListResource.get();
            return localAreaList;
        },

        getCaseTypesForLocalArea: function(locArea) {
            locAreaCaseTypes = caseTypesResource.get({
                localArea : locArea
            });
            return locAreaCaseTypes;
        }
    }
});