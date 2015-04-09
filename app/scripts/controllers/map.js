
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['config',function (config) {
		var mapCtrl = this;
		mapCtrl.config = config.map;
		mapCtrl.map = mapCtrl.config.starting;
	}]);