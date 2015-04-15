'use strict';

/**
 * @ngdoc overview
 * @name sgisApp
 * @description
 * # sgisApp
 *
 * Main module of the application.
 */
angular.module('sgisServices', [
    'ngResource',
    'uiGmapgoogle-maps'
]);
angular.module('sgisApp', [
	'ngResource',
	'ngTouch',
	'map-module',
	'sgisServices',
	'ui-module',
    'ngTagsInput'
]);