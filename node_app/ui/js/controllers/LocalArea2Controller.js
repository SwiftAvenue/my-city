'use strict';

angular.module('myCityApp').controller('LocalArea2Ctrl',
    function ($scope, $routeParams, $log, $filter, localAreaServices) {

        $log.log("Selected local area: " + $routeParams.localArea);

        $scope.currentLocalArea = $routeParams.localArea;
        $scope.currentLocalAreaId = $routeParams.localAreaId;

        $scope.grid = {
            items: [],
            currentPage: 1,
            pageSize: 10,
            maxSize: 10
        };

        localAreaServices.getCaseTypesForLocalArea($scope.currentLocalArea)
            .then(function (data) {
                $scope.grid.items = data;
            });

        localAreaServices.getNumberOfCasesGroupedByLocalArea()
            .then(function (data) {
                $scope.percentIssues = computePercentOfIssuesAgainstLocalArea($scope.currentLocalArea, data);
                $scope.citizenFeedbackRanking = computeRankingInCitizenFeedback($scope.currentLocalArea, data);
            });

        var computePercentOfIssuesAgainstLocalArea = function (localArea, data) {
            // for using the _.reduce() function, see http://stackoverflow.com/questions/14984566/underscore-reduce-clarification
            var totalNumCases = _.reduce(data, function (memo, item) {
                return memo + item.numCases;
            }, 0);
            console.log("Total Number of Cases: " + totalNumCases);
            $scope.xx1 = totalNumCases;

            var totalNumCasesForLocalArea = _.chain(data)
                .filter(function (item) {
                    return (item.localAreaName === localArea);
                }).reduce(function (memo, item) {
                    return memo + item.numCases;
                }, 0).value();
            $scope.xx2 = totalNumCasesForLocalArea;

            console.log("Total Number of Cases for " + localArea + ": " + totalNumCasesForLocalArea);
            return ((totalNumCasesForLocalArea / totalNumCases) * 100).toFixed(0);
        };

        var computeRankingInCitizenFeedback = function (localArea, data) {

            // Chaining function from underscore: given case data,
            // first filter entries whose case type is 'Citizen Feedback' (for all local areas)
            // then use reduce() function to sum up the number of cases to get the total number of cases for this case type
            var totalNumCasesInCitizenFeedback = _.chain(data)
                .filter( function(item) {
                    return (item.caseTypeName === 'Citizen Feedback');
                }).reduce(function (memo, item) {
                    return memo + item.numCases;
                }, 0).value();
            console.log("Total Number of Cases for Citizen Feedback: " + totalNumCasesInCitizenFeedback);
            $scope.tt1 = totalNumCasesInCitizenFeedback;

            var totalNumCasesInCitizenFeedbackForLocalArea = _.chain(data)
                .filter( function(item) {
                    return (item.caseTypeName === 'Citizen Feedback' && item.localAreaName === localArea);
                }).reduce(function (memo, item) {
                    return memo + item.numCases;
                }, 0).value();
            console.log("Total Number of Cases in Citizen Feedback for " + localArea + ": " + totalNumCasesInCitizenFeedbackForLocalArea);
            $scope.tt2 = totalNumCasesInCitizenFeedbackForLocalArea;

            return ((totalNumCasesInCitizenFeedbackForLocalArea / totalNumCasesInCitizenFeedback) * 100).toFixed(1);
        };

    });