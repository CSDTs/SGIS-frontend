'use strict';

angular.module('sgisServices')
	.config(function($resourceProvider) {
	  $resourceProvider.defaults.stripTrailingSlashes = false;
	})
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
        /*put google maps API key here*/
        key: 'AIzaSyDazxNgLILi-BIkhWUqgodvdQgdcWu29_g',
        v: '3.17',
        libraries: ''
    });
  }]);