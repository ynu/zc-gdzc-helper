'use strict';

/**
 * @ngdoc function
 * @name zcGdzcHelperApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the zcGdzcHelperApp
 */
angular.module('zcGdzcHelperApp')
  .controller('ListCtrl', function ($scope, gdzc) {
    $scope.Predicates = Nagu.Gdzc.Predicates;
    gdzc.listByLyr('fb1d7ab9-3a13-4e0f-b592-e848438452ef').then(function (gdzcList) {
      $scope.gdzcList = gdzcList;
    });
  });
