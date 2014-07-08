'use strict';

angular.module('myCityApp').controller('AddCaseCtrl',
    function($scope, $http,localAreaServices){
    $scope.contactMsg = 'Contact msg';
    $scope.localareas = {};
    $scope.localareas = localAreaServices.getLocalAreaList();	
	$scope.casetypes  = {};
	$scope.casetypes  = localAreaServices.getCaseTypeList();	
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
            "http://localhost:8080/mycity/api/case",
            $scope.form
        )
    };	
});