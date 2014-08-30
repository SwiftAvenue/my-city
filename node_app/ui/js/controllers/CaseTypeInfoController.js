'use strict';

angular.module('myCityApp').controller('CaseTypeInfoCtrl',
    function ($scope, $log, $routeParams, localAreaServices) {

        $log.log("Selected case type id: " + $routeParams.caseTypeId);

        $scope.caseTypeId = $routeParams.caseTypeId;

        $scope.caseTypeInfo = undefined;

        localAreaServices.getCaseTypeDetailedInfo($routeParams.caseTypeId)
            .then(function (data) {
                $scope.caseTypeInfo = data[0];
            });
    });