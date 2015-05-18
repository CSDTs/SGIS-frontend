'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('FilterController', ['$scope','sharedTagService',function ($scope,sharedTagService) {
    $scope.tags = [];
    $scope.matchAll = false;

    $scope.getActiveTags = sharedTagService.getTagListForInput;

    $scope.matchChange = function (){
      sharedTagService.setMatchAll($scope.matchAll);
    };

  	$scope.runFilter = function(){
      var tempTags = [];
      for (var x in $scope.tags){
        tempTags.push($scope.tags[x].text);
      }
      sharedTagService.setFilterByList(tempTags);
      
  	};
    $scope.clearTags = function(){
      $scope.tags = [];
      $scope.runFilter();
    };


  }]);
