'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('DatasetListController', ['$scope','getServices','sharedTagService','envService',function ($scope,getServices,sharedTagService,envService) {
    /*function inside here is done when query returns*/
  	$scope.datasets = getServices.datasetList.query(function() {
      var temp = $scope.datasets;
      $scope.datasets = $scope.datasets.results;
      var recursiveLoad = function(num){
        temp = getServices.datasetList.query({page:num},function(){
          for (var i = 0; i < temp.results.length;i++){
            temp.results[i]['active'] = false;
          }
          $scope.datasets = $scope.datasets.concat(temp.results);
          if (temp.next != null){
            recursiveLoad(num+1);
          }
        });
      };
      for (var i = 0; i < $scope.datasets.length;i++){
        $scope.datasets[i]['active'] = false;
      }
      if (temp.next!=null){
        recursiveLoad(2);
      }
    });
  	$scope.activeTags = sharedTagService.getTagList();
    $scope.getDataset = function(datasetIndex){
      return $scope.datasets[datasetIndex];
    };

  }]);
