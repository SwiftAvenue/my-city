'use strict';

angular.module('myCityApp').controller('LabCtrl',
    function ($scope, $log, $http, localAreaServices) {
        $scope.testMsg = 'Experimental Page';

        $scope.chartData = [];
        localAreaServices.getMonthlyCaseTypesForLocalArea('Downtown')
            .then(function (data) {
                $scope.monthlyCaseTypes = data;
                prepareTheChartData($scope.monthlyCaseTypes);
            });

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
            },
            series: [
                {
                    name: 'CT 1',
                    data: [10,15,12,8,7]
                },
                {
                    name: 'CT 2',
                    data: [15,12,11,7,7]
                }
            ],
            title: {
                text: 'Hello'
            },
            size: {
                width: 400,
                height: 300
            },
            loading: false
        };

        angular.extend($scope, {
            japan: {
                lat: 49.25,
                lng: -123.1482,
                zoom: 12
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

        // Get the countries geojson data from a JSON
        $http.get("data/test2.geojson").success(function(data, status) {
            angular.extend($scope, {
                geojson: {
                    data: data,
                    style: {
                        fillColor: "green",
                        weight: 2,
                        opacity: 1,
                        color: 'red',
                        dashArray: '3',
                        fillOpacity: 0.7
                    }
                }
            });
        });

        var prepareTheChartData = function (rawData) {
            // $log.log("Size Chartdata.data[0].y=" + _.size($scope.chartData.data[0].y));
            var seriesData = _.uniq(_.pluck(rawData, 'caseTypeName'));
            $scope.chartData = seriesData;
            // $log.log("List of case types: " + seriesData);
        };
    });