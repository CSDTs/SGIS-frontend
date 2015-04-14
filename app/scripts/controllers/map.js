
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','config','uiGmapGoogleMapApi',function ($scope,config,uiGmapGoogleMapApi) {
		var mapCtrl = $scope;
		mapCtrl.map = {
			control: {},
			events: {
				dragend: function(){
					console.log(mapCtrl.map.control);
				},
			},
		};

		mapCtrl.bounds = {};
		mapCtrl.config = config.map;
		mapCtrl.map.center = mapCtrl.config.starting.center;
		mapCtrl.map.zoom = mapCtrl.config.starting.zoom;
		
		uiGmapGoogleMapApi.then(function(maps) {
			mapCtrl.map.events.dragend();
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