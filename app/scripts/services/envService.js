'use strict';

angular.module('sgisServices')
  .service('envService', function () {
  	var boundingBox = {};
  	var activeDatasets = {};

  	return {
			getBoundingBox:function(){
				return boundingBox;
			},
  		getActiveDatasets:function(){
  			return activeDatasets;
  		},
  		getFilterTags:function(){
  			return filterTags;
  		},
			setBoundingBox:function(input){
				boundingBox = input;
			},
  		setActiveDatasets:function(input){
  			activeDatasets = input;
  		},
  		addActiveDataset:function(id){
  			activeDatasets[id] = true;
  		},
  		removeActiveDataset:function(id){
  			delete activeDatasets[id];
  		},
  		applyMap:function(){
  	/*		$scope.map = {
    	events: {
            tilesloaded: function (map) {
                $scope.$apply(function () {
                    $scope.mapInstance = map;
                });
            }
        }
    }*/
  		}
  	};
  });