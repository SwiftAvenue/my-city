var services = angular.module('myCity.services', ['ngResource']);

services.factory('localAreaServices', function ($resource) {
    var url ='http://localhost:8080/mycity/api/localAreasSummaries';
    return $resource(url, {}, {
        localAreas: {
            method: 'GET',
            params: {},
            isArray: true
        }
    })
});