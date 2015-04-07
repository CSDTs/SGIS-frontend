'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('DatasetListController', ['$scope','datasetList',function ($scope, datasetList) {
    /*local scope accessible by anonymous functions*/
    var datasetListCtrl = this;
    /*function inside here is done when query returns*/
  	datasetListCtrl.datasets = datasetList.query(function() {
      var temp = datasetListCtrl.datasets;
      datasetListCtrl.datasets = datasetListCtrl.datasets.results;
      var recursiveLoad = function(num){
        temp = datasetList.query({page:num},function(){
          datasetListCtrl.datasets = datasetListCtrl.datasets.concat(temp.results);
          if (temp.next != null){
            recursiveLoad(num+1);
          }
        });
      };
      recursiveLoad(2);
    });
   /* var temp = {};
    var temp2 = {};
    datasetListCtrl.datasets.map(function (value, index){
    	temp[value.id] = value;
    	temp2[value.id] = false;
    	delete temp[value.id].id;
    });
    this.datasets = temp;
  	this.activeDatasets = temp2;*/
  	this.activeTags = [];
  	this.here = false;


  	this.setActiveTags = function(){
  		this.activeTags = [];
  		for (var k in this.activeDatasets){
  			if(this.activeDatasets[k]){
  				this.activeTags = this.activeTags.concat(this.datasets[k].tags);
  			}
  		}
  	};

  	this.toggleActivatedDataset = function (datasetId){
  		if (this.activeDatasets[datasetId]) {
  				this.here=true;
  		/*just activated, this is tied to checkbox*/
  			this.activeTags = this.activeTags.concat(this.datasets[datasetId].tags);
	  	} else {
	  		this.setActiveTags();
	  	}
  	}

  }]);
