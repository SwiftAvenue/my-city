var myCityWeb = angular.module('myCity.controllers',[]);

    myCityWeb.controller('LocalAreaCtrl',['$scope','localAreaServices',function($scope,localAreaServices){
    $scope.localareas = {};
    localAreaServices.query(function(response){
        $scope.localareas = response;
    });

}]);

myCityWeb.controller('AboutCtrl',['$scope','localAreaServices',function($scope,localAreaServices){
    $scope.aboutMsg = 'About msg';
}]);

myCityWeb.controller('ContactCtrl',['$scope','localAreaServices',function($scope,localAreaServices){
    $scope.contactMsg = 'Contact msg';
}]);