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
    $scope.result = '';
    $scope.options = null;
    $scope.details = '';
    $scope.convertCoords= function(){
//            $scope.newMark={};
//            $scope.newMark.location={
//                latitude: $scope.details.geometry.location.k,
//                longitude: $scope.details.geometry.location.A
//            };
//            $scope.map.center.latitude=$scope.newMark.location.latitude;
//            $scope.map.center.longitude=$scope.newMark.location.longitude;
//            $scope.map.zoom=12;
        console.log('Hello new marker');
    };
    // Datasets taking input from Json
    $scope.data1 = false;
    $scope.data2 = false;
    $scope.data3 = false;

    $scope.datasets = [];
    /*$http.get('scripts/controllers/retailFood.json').success(function(dataFood){
        $scope.retailStores=dataFood;
        $scope.datasets.push(dataFood);
    });*/
    $scope.dataCheck1= function(){

        console.log('Hi :)');
        if($scope.data1===false){
            console.log($scope.data1);
            $scope.dataset1=null;
        }
        else {
            console.log($scope.data1);
            $scope.dataset1=$scope.datasets;
            console.log($scope.datasets);
        }
    };

    $scope.events = {
        'click': function() {
            console.log('Here!');
        }
    };
  });
