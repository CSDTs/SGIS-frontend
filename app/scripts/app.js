'use strict';

/**
 * @ngdoc overview
 * @name socialjusticeApp
 * @description
 * # socialjusticeApp
 *
 * Main module of the application.
 */
angular
  .module('socialjusticeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'google-maps'.ns(),
    'ngAutocomplete',
    'mgcrea.ngStrap',
    'angularCharts',
    'multi-select',
    'checklist-model',
    'djangoRESTResources',
    'ngTagsInput',
    'angucomplete'
  ])
  .config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
    GoogleMapApi.configure({
      key: 'AIzaSyBsqM8z-sm8gohHbuBO-2KlzbTyxbEAvsc',
      v: '3.17',
      libraries: 'places,geometry,drawing'
    });
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
   
  });



