'use strict';

var  myCityApp = angular.module('myCityApp',
        ['ngRoute','ngResource', 'ui.bootstrap', 'angularCharts', 'myCity.filters', 'myCity.services']);

myCityApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/city', {
                templateUrl: 'partials/city.html',
                controller: 'CityCtrl'
            }).
            when('/local/:localArea', {
                templateUrl: 'partials/localArea.html',
                controller: 'LocalAreaCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            otherwise({
                redirectTo: '/city'
            });

    }]);