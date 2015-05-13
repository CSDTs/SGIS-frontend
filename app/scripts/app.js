'use strict';

/**
 * @ngdoc overview
 * @name sgisApp
 * @description
 * # sgisApp
 *
 * Main module of the application.
 */
angular.module('sgisServices',[
	'uiGmapgoogle-maps',
	'ngResource'
]);
angular.module('sgisApp', [
	'ngResource',
	'ngTouch',
	'map-module',
	'sgisServices',
    'ngTagsInput',
    'ngDialog'
]).config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});
