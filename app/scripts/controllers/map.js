
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','config','envService','uiGmapGoogleMapApi',function ($scope,config,envService,uiGmapGoogleMapApi) {
		$scope.map = {
			control: {},
			events: {
				tilesloaded: function(map,eventName,args){
				var bounds = $scope.map.control.getGMap().getBounds();
				envService.setBoundingBox({
					maxLat: bounds.getNorthEast().lat(),
					maxLon: bounds.getNorthEast().lng(), 
					minLat: bounds.getSouthWest().lat(), 
					minLon: bounds.getSouthWest().lng()
				});
				}
			}

		};
		$scope.map.zoom = config.map.starting.zoom;
		$scope.map.center = config.map.starting.center;

		uiGmapGoogleMapApi.then(function(maps) {
		});
	}]);

	/*angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','config','uiGmapGoogleMapApi',function ($scope,config,uiGmapGoogleMapApi) {
		var mapCtrl = $scope;
		mapCtrl.bounds = {};
		mapCtrl.config = config.map;
		mapCtrl.map = {
			center: mapCtrl.config.starting.center,
			zoom: mapCtrl.config.starting.zoom,
			events: {
				dragend: function(){
					console.log(mapCtrl.map.control);
				},
			},
		};

		uiGmapGoogleMapApi.then(function(maps) {
    	mapCtrl.mapObj = maps;
    	console.log(mapCtrl.map.control);
   		//var bounds =  mapCtrl.map.control.getGMap().getBounds();
   		console.log(mapCtrl.bounds);
   			//mapCtrl.$apply();
        /*$scope.maxLat = bounds.getNorthEast().lat();
        $scope.maxLon = bounds.getNorthEast().lng();
        $scope.minLat = bounds.getSouthWest().lat();
        $scope.minLon = bounds.getSouthWest().lng();
			var bounds =  mapCtrl.mapObj.getBounds();
			console.log(bounds);
      envService.setBoundingBox({
      	maxLat: bounds.northeast.lat(), 
      	maxLon: bounds.northeast.lng(), 
      	minLat: bounds.southwest.lat(), 
      	minLon: bounds.southwest.lng()
      });
  	});
	}]);
*/