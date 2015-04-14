'use strict';

angular.module('sgisServices')
  .service('envService', function () {
  	var boundingBox = {};
  	var activeDatasets = {};
  	var filterTags = [];
  	var matchAll = false;

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
  		getMatchAll:function(){
  			return matchAll;
  		},
  		getMatch:function(){
  			return matchAll ? 'all' : 'any';
  		},
			setBoundingBox:function(input){
				boundingBox = input;
				console.log(boundingBox);
			},
  		setActiveDatasets:function(input){
  			activeDatasets = input;
  		},
  		setFilterTags:function(input){
  			filterTags = input;
  		},
  		setMatchAll:function(input){
  			matchAll = input;
  		},
  		addActiveDataset:function(id){
  			activeDatasets[id] = true;
  		},
  		removeActiveDataset:function(id){
  			delete activeDatasets[id];
  		},
  		concatTags:function(list){
  			filterTags = filterTags.concat(list);
  		},
  		addTag:function(tag){
  			filterTags.push(tag);
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