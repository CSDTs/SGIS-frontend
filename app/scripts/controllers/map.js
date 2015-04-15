
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
