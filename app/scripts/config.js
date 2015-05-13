'use strict';

angular.module('sgisServices')
	.config(function($resourceProvider) {
	  $resourceProvider.defaults.stripTrailingSlashes = false;
	})
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
        /*put google maps API key here*/
        key: '',
        v: '3.17',
        libraries: ''
    });
  }]);