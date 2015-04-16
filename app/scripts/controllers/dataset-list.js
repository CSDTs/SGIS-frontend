'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('DatasetListController', ['$scope','getServices','sharedTagService','sharedGeomService','envService',function ($scope,getServices,sharedTagService,sharedGeomService,envService) {
    /*local scope accessible by anonymous functions*/
    var datasetListCtrl = this;
    /*function inside here is done when query returns*/
  	datasetListCtrl.datasets = getServices.datasetList.query(function() {
      var temp = datasetListCtrl.datasets;
      datasetListCtrl.datasets = datasetListCtrl.datasets.results;
      var recursiveLoad = function(num){
        temp = getServices.datasetList.query({page:num},function(){
          for (var i = 0; i < temp.results.length;i++){
            temp.results[i]['active'] = false;
          }
          datasetListCtrl.datasets = datasetListCtrl.datasets.concat(temp.results);
          if (temp.next != null){
            recursiveLoad(num+1);
          }
        });
      };
      for (var i = 0; i < datasetListCtrl.datasets.length;i++){
        datasetListCtrl.datasets[i]['active'] = false;
      }
      if (temp.next!=null){
        recursiveLoad(2);
      }
    });
  	datasetListCtrl.activeTags = sharedTagService.getTagList();
    datasetListCtrl.getDataset = function(datasetIndex){
      return datasetListCtrl.datasets[datasetIndex];
    };

  }]);
