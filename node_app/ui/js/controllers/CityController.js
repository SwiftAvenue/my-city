'use strict';

angular.module('myCityApp').controller('CityCtrl',
    function($scope, localAreaServices) {

    $scope.localareas = {};
    $scope.localareas = localAreaServices.getLocalAreaList();

});