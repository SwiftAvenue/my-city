'use strict';

angular.module('myCityApp').controller('LocalAreaCtrl',
    function($scope, $routeParams, $log, $filter, localAreaServices) {

    $log.log("Selected local area: " + $routeParams.localArea);

    $scope.currentLocalArea = $routeParams.localArea;

        /*
    $scope.grid = {
            items: [],
            currentPage: 1, // array, to support current page for multiple grids. Starting at page 1
            pageSize: 5, // Default page size, which is applicable to all the tabs

            pageChanged: function () {
               $log.log("Page has been changed to " + $scope.grid.paging.currentPage);
            }
        };
        */

    $scope.grid = {
        items: [],
        currentPage: 1,
        pageSize: 5,
        maxSize: 5
        };

    $scope.grid.items = localAreaServices.getCaseTypesForLocalArea($scope.currentLocalArea);

});