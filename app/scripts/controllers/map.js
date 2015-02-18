
angular.module('map-module',['uiGmapgoogle-maps'])

.controller('MapController',function () {
	this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
})

;