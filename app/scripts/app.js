'use strict';

/**
 * @ngdoc overview
 * @name zcGdzcHelperApp
 * @description
 * # zcGdzcHelperApp
 *
 * Main module of the application.
 */
angular
  .module('zcGdzcHelperApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload'
  ])
  .config(function($httpProvider){
    $httpProvider.defaults.withCredentials = true;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/wxtest', {
        templateUrl: 'views/wxtest.html',
        controller: 'WxtestCtrl'
      })
      .when('/uploadtest', {
        templateUrl: 'views/uploadtest.html',
        controller: 'UploadtestCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
