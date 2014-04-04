var phoneCatApp = angular.module('phoneCatControllers', []);

phoneCatApp.controller('PhoneListCtrl', ['$scope',
function($scope) {
    $scope.phones = [
        {'name': 'Nexus S',
         'snippet': 'Fas just got faster with Nexus S'},
        {'name': 'Samsung Galaxy 5',
            'snippet': 'Samsung.. where the world lives'},
        {'name': 'Iphone 5',
            'snippet': 'Iphone 5.. the king'}
    ]

    $scope.sayHi = "Hello Angular!!!"
}]);

phoneCatApp.controller('LocalAreaCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var url = 'http://mycity2.swiftavenue.com/mycity/api/localAreasSummaries'

        $scope.msg = "Local Areas Summary";
        var res = $resource(url,{}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
        var res2 = $resource(url,{}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
        $scope.localareas = res2.get();
}]);