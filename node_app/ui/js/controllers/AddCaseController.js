'use strict';

angular.module('myCityApp').controller('AddCaseCtrl',
    function($scope, $http,localAreaServices){
    $scope.contactMsg = 'Contact msg';
    $scope.localAreas = {};
    $scope.localAreas = localAreaServices.getLocalAreaList();
	$scope.caseTypes  = {};
	$scope.form = {
            street: '',
            block: '',
            caseType: '',
			localArea: '',
			name: ''
        };
	//$scope.addCase = function(){
	//localAreaServices.addCase($scope.form);
	//};
    // save a new todo, based on the "description" property
	//var baseUrl = 'http://localhost:8080/mycity/api/';
    $scope.addCase = function() {
        $http.post(
            "http://localhost:8080/api/case",
            $scope.form
        )
    };	
});