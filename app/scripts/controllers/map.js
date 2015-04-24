
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','config','envService','sharedTagService','getServices','uiGmapGoogleMapApi',function ($scope,config,envService,sharedTagService,getServices,uiGmapGoogleMapApi) {
    envService.init();
    var mapCtrl = this;
    mapCtrl.stop = false;
    $scope.map = {
        center: {
            latitude: 42.68,
            longitude: -73.75
        },
        zoom: 12,
        control: {}
    };
    $scope.map.events={
      tilesloaded: function(map,eventName,args){
        var bounds = $scope.map.control.getGMap().getBounds();
        envService.setBoundingBox({
          max_lat: bounds.getNorthEast().lat(),
          max_lon: bounds.getNorthEast().lng(), 
          min_lat: bounds.getSouthWest().lat(), 
          min_lon: bounds.getSouthWest().lng()
        });
      }
    };
    $scope.markers = [];
    $scope.polygons = [];

    $scope.loadDataset= function(dataset){
      if (mapCtrl.stop){return;}
      mapCtrl.params = envService.getBoundingBox();
      mapCtrl.params.dataset = dataset;
      mapCtrl.params.tag = sharedTagService.getFilterTagList();
      if (mapCtrl.params.tag.length > 0){
        mapCtrl.params.match = sharedTagService.getMatch();
      } else {
        delete mapCtrl.params.tag;
        delete mapCtrl.params.match;
      }
      mapCtrl.params.page = 1;
      var scp = $scope;

      var temp_markers = getServices.mapElement.query(mapCtrl.params,function() {
        
        var recursiveLoadPoints = function(num){
          mapCtrl.params.page = num;
          var next = false;
          temp_markers = getServices.mapElement.query(mapCtrl.params,function(){
            next = temp_markers.pop();
            scp.markers = scp.markers.concat(temp_markers);
            if (next  && !mapCtrl.stop){
              recursiveLoadPoints(num+1);
            }
          });
        };
        next = temp_markers.pop();
        scp.markers = scp.markers.concat(temp_markers);
        if (next  && !mapCtrl.stop){
          recursiveLoadPoints(2);
        }
      });

      var temp_polygons = getServices.mapElement.query(mapCtrl.params,function() {
        var recursiveLoadPoints = function(num){
          mapCtrl.params.page = num;
          var next = false;
          temp_polygons = getServices.mapElement.query(mapCtrl.params,function(){
            next = temp_polygons.pop();
            scp.polygons = scp.polygons.concat(temp_polygons);
            if (next  && !mapCtrl.stop){
              recursiveLoadPoints(num+1);
            }
          });
        };
        next = temp_polygons.pop();
        scp.polygons = scp.polygons.concat(temp_polygons);
        if (next  && !mapCtrl.stop){
          recursiveLoadPoints(2);
        }
      });
    };
    $scope.stopStart = function(){
      this.stop = !this.stop;
    };
  	$scope.toggleActivatedDataset = function (dataset){
  		if (dataset.active) {
  		//just activated, this is tied to checkbox
  			sharedTagService.addTags(dataset);
	      envService.addActiveDataset(dataset.id);
	      $scope.loadDataset(dataset.id);
	  	} else {
	        sharedTagService.removeTags(dataset);
	        envService.removeActiveDataset(dataset.id);
	  	}
  	};
	}]);