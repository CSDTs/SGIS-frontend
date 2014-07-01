'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('MainCtrl',function ($scope,$http, dataSource, dataFeed) {

    var google = window.google;

    $scope.sources = dataSource.query();
    $scope.data = {};

    $scope.onSelect = function(dataSourceId) {
        if($scope.data[dataSourceId] !== undefined) {
            $scope.data[dataSourceId] = undefined;
        } else {
            $scope.data[dataSourceId] = dataFeed.query({'dataSourceId':dataSourceId});
        }
    };
        $scope.result = '';
        $scope.options = null;
        $scope.details = '';
        $scope.newMark={};

    $scope.convertCoords= function(){
        $scope.newMark.location={
            latitude: $scope.details.geometry.location.k,
            longitude: $scope.details.geometry.location.A
        };
        $scope.map.center.latitude=$scope.newMark.location.latitude;
        $scope.map.center.longitude=$scope.newMark.location.longitude;
        $scope.map.zoom=12;
    };

            $scope.map = {
    		center: {
    		  	latitude: 42.678681,
    		  	longitude: -73.741265
    		},
    		zoom: 9,
    		options: {
    			streetViewControl: true,
    			panControl: true,
    			panControlOptions: {
    				position: google.maps.ControlPosition.TOP_RIGHT
    			},
    			zoomControl: true,
    			zoomControlOptions: {
      				style: google.maps.ZoomControlStyle.LARGE,
      				position: google.maps.ControlPosition.RIGHT_TOP
    				},
    			maxZoom: 20,
    			minZoom: 3
    		},
    		dragging: true
		};
    var markerToClose = null;
    $scope.onClicked = function (marker) {
            if (markerToClose) {
              markerToClose.showWindow = false;
            }
        markerToClose = marker; // for next go around
        marker.showWindow = true;
        $scope.$apply();
    };
  });
