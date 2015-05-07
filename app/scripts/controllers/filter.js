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
      sharedTagService.setMatchAll(matchAll);
    };

  	$scope.runFilter = function(){
      var temp_tags = [];
      for (var x in $scope.tags){
        temp_tags.push($scope.tags[x].text);
      }
      sharedTagService.setFilterByList(temp_tags);
      
  	};
    $scope.clearTags = function(){
      $scope.tags = [];
      $scope.runFilter();
    };


  }]);
