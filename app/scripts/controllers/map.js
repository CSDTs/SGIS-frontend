
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','$window','config','envService','sharedTagService','getServices','uiGmapGoogleMapApi',function ($scope,$window,config,envService,sharedTagService,getServices,uiGmapGoogleMapApi) {
    envService.init();
    $("#map .angular-google-map-container").height($window.innerHeight-90);
    var mapCtrl = this;
    mapCtrl.stop = true;
    mapCtrl.pages = {};
    mapCtrl.icons = function (color) {
      var icon = config.svg;
      icon.fillColor = color;
      return icon;
    };
    mapCtrl.colors = {};
    mapCtrl.dataLayers = {};
    mapCtrl.loaded = false;

    mapCtrl.makeColor = function(num){
      if (!mapCtrl.colors.hasOwnProperty(num)){
        var getStr = function(mult){
          var val = (num * mult) % 256;
          val = val.toString(16);
          return val.length == 2 ? val : '0'+val;
        };

        var r = getStr(25);
        var g = getStr(30);
        var b = getStr(100);
        mapCtrl.colors[num] = {color:'#'+r+g+b};
      }

      return mapCtrl.colors[num].color
    };
    mapCtrl.dataStyleOptions = function(feature) {
      var num = feature.getProperty('dataset');
      var color = mapCtrl.makeColor(num);
      return ({
        icon: mapCtrl.icons(color),
        fillColor: color,
        fillOpacity: .3,
        strokeColor: color,
        strokeWeight: 1,
        clickable: true
      });
    };
    //initialize map
    $scope.map = {
        center: {
            latitude: 42.68,
            longitude: -73.75
        },
        zoom: 12,
        control: {}
    };
    mapCtrl.resetBounds = function(){
      var bounds = $scope.map.control.getGMap().getBounds();
      envService.setBoundingBox({
        max_lat: bounds.getNorthEast().lat(),
        max_lon: bounds.getNorthEast().lng(), 
        min_lat: bounds.getSouthWest().lat(), 
        min_lon: bounds.getSouthWest().lng()
      });
    };
    mapCtrl.moInfo = null;
    mapCtrl.init_datalayer = function(num){
      mapCtrl.dataLayers[num] = new google.maps.Data();
      mapCtrl.dataLayers[num].setStyle(mapCtrl.dataStyleOptions);
      mapCtrl.dataLayers[num].addListener('mouseover', function(event) {
        //mapCtrl.moInfo = new google.maps.InfoWindow({content: event.feature.getProperty('name'), position: event.feature.latLng}); 
        //mapCtrl.moInfo.open($scope.mapInstance);
      });
      mapCtrl.dataLayers[num].addListener('mouseout', function(event) {
         mapCtrl.moInfo.close();
      });
      mapCtrl.dataLayers[num].addListener('click', function(event) {
        mapCtrl.moInfo = new google.maps.InfoWindow({content: event.feature.getProperty('name'), position: event.feature.latLng}); 
        mapCtrl.moInfo.open($scope.mapInstance);

      });
  };
    $scope.map.events={
      tilesloaded: function(map,eventName,args){
        mapCtrl.resetBounds();
        $scope.mapInstance = map;
        $scope.stopStart();
      },
      bounds_changed: function(map,eventName,args){
        mapCtrl.resetBounds();
        for (num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };

    $scope.loadDataset= function(dataset){
      if (mapCtrl.stop){return;}
      mapCtrl.params = envService.getBoundingBox();
      mapCtrl.params.dataset = dataset;
      mapCtrl.params.tag = sharedTagService.getFilterTagList();
      if (mapCtrl.params.tag.length > 0){
        mapCtrl.params.match = sharedTagService.getMatch();
      } else {
        delete mapCtrl.params.tag;
        delete mapCtrl.params.match;
      }
      if (!mapCtrl.pages.hasOwnProperty(dataset)){
        mapCtrl.pages[dataset] = {};
      } 
      if (!mapCtrl.pages[dataset].hasOwnProperty(mapCtrl.params)){
        mapCtrl.pages[dataset][mapCtrl.params] = 1;
      } 
      mapCtrl.params.page = mapCtrl.pages[dataset][mapCtrl.params];

      var recursiveLoadPoints = function(num){
        mapCtrl.params.page = num;
        var temp_markers = getServices.mapElement.query(mapCtrl.params,function(){
          mapCtrl.dataLayers[dataset].addGeoJson(temp_markers.results); 

          if (temp_markers.next  && !mapCtrl.stop){
            recursiveLoadPoints(mapCtrl.params.page+1);
          } else if (mapCtrl.stop){
            mapCtrl.pages[dataset][mapCtrl.params] = mapCtrl.params.page+1;
            delete mapCtrl.params.page;
          }
        });
      };

      recursiveLoadPoints(1);
    };

    ///this is not working - servcies cached?
    $scope.refreshMap = function(){
      mapCtrl.stop = true;
      mapCtrl.dataLayers = {};
      mapCtrl.stop = false;
      for (num in envService.getActiveDatasets()){
        if (!mapCtrl.dataLayers.hasOwnProperty(num)){
          mapCtrl.init_datalayer(num);
        }
          $scope.loadDataset(num);
        }
      
    };
    mapCtrl.applyFilter = function(){
      var tags = sharedTagService.getFilterByList();
      for (var layer in mapCtrl.dataLayers){
        mapCtrl.dataLayers[layer].forEach(function(feature) {
          if (tags.length  == 0){
            mapCtrl.dataLayers[layer].overrideStyle(feature, {visible: true});
          } else if (sharedTagService.getMatch() == 'all'){
            for (var tag in tags){
              if ($.inArray(tags[tag],feature.getProperty('tags')) == -1){
                mapCtrl.dataLayers[layer].overrideStyle(feature, {visible: false});
              } else {
                mapCtrl.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }
          } else {
            mapCtrl.dataLayers[layer].overrideStyle(feature, {visible: false});
            for (var tag in tags){
              if ($.inArray(tags[tag],feature.getProperty('tags')) > -1){
                mapCtrl.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }

          }
        });
      }
    };
    $scope.stopStart = function(){
      mapCtrl.stop = !mapCtrl.stop;
      if (!mapCtrl.stop){
        for (num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };
  	$scope.toggleActivatedDataset = function (dataset){
  		if (dataset.active) {
  		//just activated, this is tied to checkbox
        mapCtrl.stop = false;
  			sharedTagService.addTags(dataset);
	      envService.addActiveDataset(dataset.id);
        if (!mapCtrl.dataLayers.hasOwnProperty(dataset.id)){
          mapCtrl.init_datalayer(dataset.id);
        }
        mapCtrl.dataLayers[dataset.id].setMap($scope.mapInstance);
	      $scope.loadDataset(dataset.id);
	  	} else {
        mapCtrl.stop = true;
        sharedTagService.removeTags(dataset);
        envService.removeActiveDataset(dataset.id);
        mapCtrl.dataLayers[dataset.id].setMap(null);
        $scope.stopStart();
	  	}
  	};
	}]);