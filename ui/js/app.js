var  myCityWeb = angular.module('myCityWeb',['ngRoute','ngResource','myCity.services','myCity.controllers']);

myCityWeb.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/local', {
                templateUrl: 'partials/local-areas.html',
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
                redirectTo: '/local'
            });

    }]);