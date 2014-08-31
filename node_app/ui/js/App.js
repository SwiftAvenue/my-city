'use strict';

var  myCityApp = angular.module('myCityApp',
        ['ngRoute','ngResource', 'ui.bootstrap', 'angularCharts', 'highcharts-ng',
            'leaflet-directive', 'angularModalService', 'myCity.filters', 'myCity.services']);

myCityApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/city', {
                templateUrl: 'partials/city.html',
                controller: 'CityCtrl'
            }).
            when('/local2/:localArea/:localAreaId', {
                templateUrl: 'partials/localArea2.html',
                controller: 'LocalArea2Ctrl'
            }).
            when('/local/:localArea/:localAreaId/:caseTypeId', {
                templateUrl: 'partials/caseType.html',
                controller: 'CaseTypeCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutCtrl'
            }).
            when('/caseTypeInfo/:caseTypeId', {
                templateUrl: 'partials/caseTypeInfo.html',
                controller: 'CaseTypeInfoCtrl'
            }).
            when('/addCase', {
                templateUrl: 'partials/addCase.html',
                controller: 'AddCaseCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            when('/lab', {
                templateUrl: 'partials/lab.html',
                controller: 'LabCtrl'
            }).
            otherwise({
                redirectTo: '/city'
            });

    }]);