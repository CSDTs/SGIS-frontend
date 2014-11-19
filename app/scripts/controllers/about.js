'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('AboutCtrl', function($scope) {

    $scope.button=function(argument) {
    	console.log($scope.data);
    };
    
  });
