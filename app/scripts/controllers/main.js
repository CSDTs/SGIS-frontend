'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('MainCtrl',function ($scope,$http, $modal, dataSource, dataFeed) {

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
            longitude: $scope.details.geometry.location.B
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
    $scope.tabs = [
      {
        'title': 'Charts',
        'content': 'Charts View will give an area to compare different data sets',
        'template': 'views/charts.html'
      },
      {
        'title': 'Draw',
        'content': 'You can draw you own own elements',
        'template': 'views/draw.html'
      },
      {
        'title': 'Add',
        'template': 'views/about.html',
        'content': 'Add'
      }
    ];
     $scope.events={
        rightclick: function () {
            console.log('Hello');
        }
    };
    $scope.editNewMarker={
        options:
        { draggable:true},
        events:
        {  drag:function () {
                console.log('Hello');
                
            }
        }
    };
     $scope.infoWindowWithCustomClass= {
        // coords: {
        //   latitude: 36.270850,
        //   longitude: -44.296875
        // },
        options: {
          boxClass: 'custom-info-window'
        },
        show: true
    };
     $scope.AddwithDescription=function(){
        $scope.editTodo=true;
        console.log('Hi');
    };

    var tagsModal = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});

    $scope.makeModal = function() {
        tagsModal.$promise.then(tagsModal.show);
    };
  });
