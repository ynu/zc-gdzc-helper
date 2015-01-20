'use strict';

/**
 * @ngdoc function
 * @name zcGdzcHelperApp.controller:UploadtestCtrl
 * @description
 * # UploadtestCtrl
 * Controller of the zcGdzcHelperApp
 */
angular.module('zcGdzcHelperApp')
  .controller('UploadtestCtrl', function ($scope, $upload) {
    $scope.upload = function (myfile) {
      $upload.upload({
        url:'http://ngapi.ynu.edu.cn/ynuxg/ImportStudentData',
        data: {
          data1:'dd'
        },
        file: myfile
      });
    };
  });
