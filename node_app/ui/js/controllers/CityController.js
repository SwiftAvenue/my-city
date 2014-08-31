'use strict';

angular.module('myCityApp').controller('CityCtrl',
    function($scope, localAreaServices) {

    $scope.localAreas = {};
    localAreaServices.getLocalAreaList()
        .then( function (data) {
            $scope.localAreas = data;
        });

});