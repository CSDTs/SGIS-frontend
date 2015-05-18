'use strict';

angular.module('map-module',['uiGmapgoogle-maps','sgisServices','ngAutocomplete'])
	.controller('MapController',['$scope','$window','config','envService','sharedTagService','getServices','uiGmapGoogleMapApi','ngDialog',function ($scope, $window, config, envService, sharedTagService, getServices, uiGmapGoogleMapApi, ngDialog) {
    /*init processes/variables*/
    envService.init();
    $('#map .angular-google-map-container').height($window.innerHeight-90);
    var pages = {};

    $scope.stop = true;
    $scope.colors = {};
    $scope.dataLayers = {};
    $scope.userCircles = [];

    //initialize map
    $scope.map = {
        center: {
            latitude: 42.68,
            longitude: -73.75
        },
        zoom: 12,
        control: {}
    };
    $scope.findLocation = {
      search: '',
      details: {},
      options: {}
    };

    $scope.radius = 1;
    $scope.unit = 'mi';
    $scope.allUnits = ['mi','km'];

    var icons = function (color) {
      var icon = config.svg;
      icon.fillColor = color;
      return icon;
    };
    var makeColor = function(num){
      if (!$scope.colors.hasOwnProperty(num)){
        var getStr = function(mult){
          var val = (num * mult) % 256;
          val = val.toString(16);
          return val.length === 2 ? val : '0'+val;
        };

        var r = getStr(25);
        var g = getStr(30);
        var b = getStr(100);
        $scope.colors[num] = {color:'#'+r+g+b};
      }

      return $scope.colors[num].color;
    };
    var dataStyleOptions = function(feature) {
      var num = feature.getProperty('dataset');
      var color = makeColor(num);
      return ({
        icon: icons(color),
        fillColor: color,
        fillOpacity: 0.3,
        strokeColor: color,
        strokeWeight: 1,
        clickable: true
      });
    };

    var resetBounds = function(){
      var bounds = $scope.map.control.getGMap().getBounds();
      envService.setBoundingBox({
        max_lat: bounds.getNorthEast().lat(),
        max_lon: bounds.getNorthEast().lng(), 
        min_lat: bounds.getSouthWest().lat(), 
        min_lon: bounds.getSouthWest().lng()
      });
    };

    var initDatalayer = function(num){
      $scope.dataLayers[num] = new google.maps.Data();
      $scope.dataLayers[num].setStyle(dataStyleOptions);
    };

    $scope.map.events={
      tilesloaded: function(map){
        resetBounds();
        $scope.mapInstance = map;
        $scope.stopStart();
      },
      bounds_changed: function(){
        resetBounds();
        for (var num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };

    $scope.recenterMap = function(){
      if ($scope.findLocation.search === ''){
        return;
      }
      var limit = 100;
      while (limit && !$scope.findLocation.details.geometry.location){
        limit -= 1;
      }
      $scope.map.control.getGMap().setCenter($scope.findLocation.details.geometry.location);
    };

    

    $scope.changeUnit = function(newUnit){
      $scope.unit = newUnit;
    };

    $scope.addCircles = function(){
      if ($scope.findLocation.search === ''){
        return;
      }
      var calculatedRadius;
      switch($scope.unit){
        case 'mi':
          calculatedRadius = $scope.radius*1609.34;
          break;
        case 'km':
          calculatedRadius = $scope.radius*1000;
          break;
      }

      $scope.userCircles.push(new google.maps.Circle({
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillOpacity: 0,
        map: $scope.map.control.getGMap(),
        center: $scope.findLocation.details.geometry.location,
        radius: calculatedRadius,
        draggable: true
      }));
    };

    $scope.clearCircles = function(){
      while($scope.userCircles.length){
        var temp = $scope.userCircles.pop();
        temp.setMap(null);
        temp = null;
      }
    };

    $scope.loadDataset= function(dataset){
      if ($scope.stop){return;}
      var params = envService.getBoundingBox();
      params.dataset = dataset;
      params.tag = sharedTagService.getFilterTagList();
      if (params.tag.length > 0){
        params.match = sharedTagService.getMatch();
      } else {
        delete params.tag;
        delete params.match;
      }
      if (!pages.hasOwnProperty(dataset)){
        pages[dataset] = {};
      } 
      if (!pages[dataset].hasOwnProperty(params)){
        pages[dataset][params] = 1;
      } 
      params.page = pages[dataset][params];

      var recursiveLoadPoints = function(num){
        params.page = num;
        var tempMarkers = getServices.mapElement.query(params,function(){
          $scope.dataLayers[dataset].addGeoJson(tempMarkers.results); 

          if (tempMarkers.next  && !$scope.stop){
            recursiveLoadPoints(params.page+1);
          } else if ($scope.stop){
            pages[dataset][params] = params.page+1;
            delete params.page;
          }
        });
      };

      recursiveLoadPoints(1);

      $scope.dataLayers[dataset].addListener('click', function(event) {
        ngDialog.open({
          template: 'views/info.html',
          controller: 'InfoWindowController',
          data: event,
        });
      });
    };

    ///this is not working - servcies cached?
    $scope.refreshMap = function(){
      $scope.stop = true;
      $scope.dataLayers = {};
      $scope.stop = false;
      for (var num in envService.getActiveDatasets()){
        if (!$scope.dataLayers.hasOwnProperty(num)){
          initDatalayer(num);
        }
          $scope.loadDataset(num);
        }
      
    };
    $scope.applyFilter = function(){
      var tags = sharedTagService.getFilterByList();
      for (var layer in $scope.dataLayers){
        $scope.dataLayers[layer].forEach(function(feature) {
          if (tags.length  === 0){
            $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
          } else if (sharedTagService.getMatch() === 'all'){
            for (var tag in tags){
              if ($.inArray(tags[tag],feature.getProperty('tags')) === -1){
                $scope.dataLayers[layer].overrideStyle(feature, {visible: false});
              } else {
                $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }
          } else {
            $scope.dataLayers[layer].overrideStyle(feature, {visible: false});
            for (var t in tags){
              if ($.inArray(tags[t],feature.getProperty('tags')) > -1){
                $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }

          }
        });
      }
    };
    $scope.stopStart = function(){
      $scope.stop = !$scope.stop;
      if (!$scope.stop){
        for (var num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };
  	$scope.toggleActivatedDataset = function (dataset){
  		if (dataset.active) {
  		//just activated, this is tied to checkbox
        $scope.stop = false;
  			sharedTagService.addTags(dataset);
	      envService.addActiveDataset(dataset.id);
        if (!$scope.dataLayers.hasOwnProperty(dataset.id)){
          initDatalayer(dataset.id);
        }
        $scope.dataLayers[dataset.id].setMap($scope.mapInstance);
	      $scope.loadDataset(dataset.id);
	  	} else {
        $scope.stop = true;
        sharedTagService.removeTags(dataset);
        envService.removeActiveDataset(dataset.id);
        $scope.dataLayers[dataset.id].setMap(null);
        $scope.stopStart();
	  	}
  	};
	}]);