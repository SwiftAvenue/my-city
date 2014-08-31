'use strict';

angular.module('myCityApp').controller('CaseTypeCtrl',
    function ($scope, $log, $filter, $routeParams, localAreaServices) {

        $log.log("Selected local area: " + $routeParams.localArea);
        $log.log("Selected local area id: " + $routeParams.localAreaId);
        $log.log("Selected case type id: " + $routeParams.caseTypeId);

        $scope.caseTypeId = $routeParams.caseTypeId;
        $scope.localAreaName = $routeParams.localArea;
        $scope.localAreaId = $routeParams.localAreaId;

        $scope.currentLocalArea = $routeParams.localArea;

        $scope.caseTypeInfo = undefined;

        // Create initial chart template. the axis and series data will be populated later.
        $scope.chartConfig = {
            options: {
                chart: {
                    // options: area, areaspline, line, spline (smooth line), bar, pie, scatter, column
                    type: 'spline'
                }
            },
            xAxis: {},
            series: [],
            title: {
                text: 'Case Type History'
            },
            size: {
                width: 600,
                height: 400
            },
            loading: false
        };

        // Get the summary of selected case type for the local area. The summary is used as input
        // to the chart data
        localAreaServices.getMonthlyCaseTypeSummaryForLocalArea($scope.localAreaName, $scope.caseTypeId)
            .then(function (data) {
                $scope.monthlyCaseTypeSummary = data;
                prepareTheChartData($scope.monthlyCaseTypeSummary);
            });


        localAreaServices.getCaseTypeDetailedInfo($routeParams.caseTypeId)
            .then(function (data) {
                $scope.caseTypeInfo = data[0];
                $scope.chartConfig.title.text = 'Case History for ' + $scope.caseTypeInfo.caseTypeName;
            });

        // Prepare the chart data
        var prepareTheChartData = function (rawData) {
            $log.log("raw data size: " + _.size(rawData));

            // Need to parse each total case to float (otherwise returned as string values).
            // High-chart requires that the series data are of float type.
            var totalCasesData = [];
            _.pluck(rawData, 'totalCases').forEach(function (c) {
                totalCasesData.push(parseFloat(c));
            })
            // original month values are 'dd-MMM-yyyy'. We transform them to 'MMMyy' format
            // to make it more compact
            var xAxis = [];
            _.pluck(rawData, 'monthReported').forEach(function (d) {
                var dd = d.split('-');
                xAxis.push(dd[1] + dd[2].substring(2, 4));
            });
            $log.log("x-Axis: " + xAxis);

            $scope.chartConfig.xAxis = {
                categories: xAxis
            };
            $scope.chartConfig.series.push(
                {
                    name: $scope.localAreaName,
                    data: totalCasesData
                }
            );

        };

        // Store the list of local areas. Used by the dropdown element
        localAreaServices.getLocalAreaList()
            .then(function (data) {
                $scope.localAreas = data;
                $scope.localAreasForCheckList = mapLocalAreas(data);
            });

        var mapLocalAreas = function (data) {
            var mappedArrays = [];
            var localAreaNames = _.pluck(data, 'localAreaName');
            _.each(localAreaNames, function (name) {
                mappedArrays.push({ value: name, checked: false });
            });
            return mappedArrays;
        };

        // The selected local area whose data is to be added to the chart
        $scope.localAreaToCompare = '';

        // This function is triggered by the 'Add' button. It retrieves the case type data for
        // a selected local area, then add another series to the chart
        var addNewChart = function (localAreaName, caseTypeId) {
            localAreaServices.getMonthlyCaseTypeSummaryForLocalArea(localAreaName, caseTypeId)
                .then(function (data) {
                    $log.log("raw data size: " + _.size(data));
                    var totalCasesData = [];
                    _.pluck(data, 'totalCases').forEach(function (c) {
                        totalCasesData.push(parseFloat(c));
                    });
                    $scope.chartConfig.series.push(
                        {
                            name: localAreaName,
                            data: totalCasesData
                        }
                    );
                });
        };

        // Generate chart for the local area item that user has selected
        $scope.processSelectedLocalAreasToCompare = function () {
            $scope.resetChart();
            var selectedItems = $filter('filter')($scope.localAreasForCheckList, { checked: true });
            angular.forEach(selectedItems, function (value, index) {
                if (value.value.toLowerCase() != $scope.localAreaName.toLowerCase()) {
                    addNewChart(value.value, $scope.caseTypeId);
                }
            });
        };

        // Reset the chart
        $scope.resetChart = function () {
            $log.log("Resetting the chart...");
            $scope.chartConfig.series = [];
            localAreaServices.getMonthlyCaseTypeSummaryForLocalArea($scope.localAreaName, $scope.caseTypeId)
                .then(function (data) {
                    $log.log("raw data size: " + _.size(data));
                    var totalCasesData = [];
                    _.pluck(data, 'totalCases').forEach(function (c) {
                        totalCasesData.push(parseFloat(c));
                    });
                    $scope.chartConfig.series.push(
                        {
                            name: $scope.localAreaName,
                            data: totalCasesData
                        }
                    );
                });
        };

        $scope.addChartForSelectedLA = function () {
            addNewChart($scope.localAreaToCompare.localAreaName, $scope.caseTypeId);
        };


    });