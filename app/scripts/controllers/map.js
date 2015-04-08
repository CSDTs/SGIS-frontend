
angular.module('map-module',['uiGmapgoogle-maps'])
	.controller('MapController',function () {
		var mapCtrl = this;
		mapCtrl.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	})
;