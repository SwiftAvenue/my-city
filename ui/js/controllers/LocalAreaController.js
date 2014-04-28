'use strict';

angular.module('myCityApp').controller('LocalAreaCtrl',
    function($scope, $routeParams, $log, $filter, localAreaServices) {

    $log.log("Selected local area: " + $routeParams.localArea);

    $scope.currentLocalArea = $routeParams.localArea;

    $scope.grid = {
        items: [],
        currentPage: 1,
        pageSize: 5,
        maxSize: 5
        };

    $scope.grid.items = localAreaServices.getCaseTypesForLocalArea($scope.currentLocalArea);

    // charting used: http://chinmaymk.github.io/angular-charts/
    // initialize the chart data
    $scope.chartData = {
       series: [],
       data: []
    }

    $scope.chartConfig = {
       labels: false,
       title : "Case Type Monthly",
       legend : {
           display:true,
           position:'left'
       }
    };

    // chart type is line charts
    $scope.chartType = 'line';

    // get the chart data
    $scope.monthlyCaseTypes = undefined;
    localAreaServices.getMonthlyCaseTypesForLocalArea($scope.currentLocalArea)
        .then( function(data) {
            $scope.monthlyCaseTypes = data;
            prepareTheChartData($scope.monthlyCaseTypes);
        });

    // Test data
    //var ddd = [{"caseTypeId":"AbandonedGarbagePickupCityPropertyParks","caseTypeName":"Abandoned Garbage Pickup - City Property & Parks","month":"201402","numCases":31},{"caseTypeId":"AbandonedGarbagePickupCityPropertyParks","caseTypeName":"Abandoned Garbage Pickup - City Property & Parks","month":"201401","numCases":29},{"caseTypeId":"AbandonedVehicleRequest","caseTypeName":"Abandoned Vehicle Request","month":"201401","numCases":2},{"caseTypeId":"AbandonedVehicleRequest","caseTypeName":"Abandoned Vehicle Request","month":"201402","numCases":8},{"caseTypeId":"AnimalComplaintNonEmergencyCase","caseTypeName":"Animal Complaint - Non-Emergency Case","month":"201402","numCases":8},{"caseTypeId":"AnimalComplaintNonEmergencyCase","caseTypeName":"Animal Complaint - Non-Emergency Case","month":"201401","numCases":8},{"caseTypeId":"AnimalControlGeneralInquiryCase","caseTypeName":"Animal Control General Inquiry Case","month":"201402","numCases":5},{"caseTypeId":"AnimalControlGeneralInquiryCase","caseTypeName":"Animal Control General Inquiry Case","month":"201401","numCases":5},{"caseTypeId":"ApartmentRecyclingRegistrationRequest","caseTypeName":"Apartment Recycling - Registration Request","month":"201402","numCases":3},{"caseTypeId":"ApartmentRecyclingRegistrationRequest","caseTypeName":"Apartment Recycling - Registration Request","month":"201401","numCases":1}];

    // set the series data (ie. a list of case types)
    // var seriesData = _.uniq(_.pluck(ddd, 'caseTypeId'));

    var prepareTheChartData = function(rawData) {
        // TODO: get from user instead of hard coding it.
        var seriesData = ['AbandonedGarbagePickupCityPropertyParks', 'AbandonedVehicleRequest', 'MissedRecyclingPickup'];
        // var seriesData = _.uniq(_.pluck(rawData, 'caseTypeId'));
        $log.log("List of case types: " + seriesData);

        // set the x axis data (ie. the months such as '201401', '201402')
        var xData = _.uniq(_.pluck(rawData, 'month'));
        $log.log("List of months: " + xData);

        // set the values for each x line, which is a value fo each of the series in that x line
        var y = {};
        _.each(xData, function(xItem) {
            var yData1 = _.groupBy(_.where(rawData, {month: xItem}), 'caseTypeId');
            var t = [];
            _.each(seriesData, function(sItem) {
                // if case type not in current data, set value to 0
                if (_.contains(_.keys(yData1), sItem)) {
                    var yItem = yData1[sItem];
                    $log.log("List of yData: " + sItem + ':' + yItem[0].caseTypeId + ' --> ' + yItem[0].numCases);
                    t.push(yItem[0].numCases);
                }
                else {
                    t.push(0);
                }
            });
            y[xItem] = t;
        });

        // tData represents the data structure expected by the chart data. Here we are preparing it.
        var tData = [];
        for (var k in y) {
            var tt = {};
            tt['x'] = k;
            tt['y'] = y[k];
            tData.push(tt);
        }

        $scope.chartData = {
            series: seriesData,
            data: tData
        }

        // $log.log("Size Chartdata.data[0].y=" + _.size($scope.chartData.data[0].y));
    }

});