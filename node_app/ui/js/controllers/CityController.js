'use strict';

angular.module('myCityApp').controller('CityCtrl',
    function ($scope, ModalService, localAreaServices) {

        $scope.localAreas = {};

        localAreaServices.getLocalAreaList()
            .then(function (data) {
                $scope.localAreas = data;
            });

        var persistData = function(result) {
            $scope.message = "Name: " + result.name + " Age: " + result.email;
            console.log(result);
            localAreaServices.addNewCase(result);
        };

        $scope.show = function () {
            ModalService.showModal({
                templateUrl: 'partials/reportCase.html',
                controller: 'ModalCtrl'
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    persistData(result);
                });
            });
        };

    });