var phoneCatApp = angular.module('phoneCatApp', [
    'ngRoute',
    'ngResource',
    'phoneCatControllers'
]);

phoneCatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/phones', {
                templateUrl: 'partials/phone-list.html',
                controller: 'PhoneListCtrl'
            }).
            when('/local', {
                templateUrl: 'partials/local-areas.html',
                controller: 'LocalAreaCtrl'
            }).
            otherwise({
                redirectTo: '/local'
            });

    }]);