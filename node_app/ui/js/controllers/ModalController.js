'use strict';

angular.module('myCityApp').controller('ModalCtrl', ['$scope', 'close', 'localAreaServices',
    function ($scope, close, localAreaServices) {
        $scope.name = null;
        $scope.email = null;
        $scope.localArea = null;
        $scope.addressBlock = null;
        $scope.addressStreet = null;
        $scope.caseDescription = null;

        $scope.localAreaList = {};
        $scope.caseTypeList = {};

        // retrieve the list of local areas, for use by the drop down input field
        localAreaServices.getLocalAreaList()
            .then(function (data) {
                $scope.localAreaList = data;
        });

        $scope.caseTypeList = localAreaServices.getCaseTypes();

        // See: http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/
        $scope.close = function (result) {
            // close, but give enough time for bootstrap to animate
            // pass the form values to this close function so they are visible to the parent page
            close({
                name: $scope.name,
                email: $scope.email,
                localAreaName: $scope.localArea.localAreaName,
                localAreaId: $scope.localArea.localAreaId,
                addressBlock: $scope.addressBlock,
                addressStreet: $scope.addressStreet,
                caseTypeName: $scope.caseType.caseTypeName,
                caseTypeId: $scope.caseType.caseTypeId,
                caseDescription: $scope.caseDescription
            }, 500);
        };
    }]);