
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','$window','config','envService','sharedTagService','getServices','uiGmapGoogleMapApi','ngDialog',function ($scope, $window, config, envService, sharedTagService, getServices, uiGmapGoogleMapApi, ngDialog) {
    /*init processes/variables*/
    envService.init();
    $("#map .angular-google-map-container").height($window.innerHeight-90);
    var pages = {};
    var loaded = false;

    $scope.stop = true;
    $scope.colors = {};
    $scope.dataLayers = {};
    //initialize map
    $scope.map = {
        center: {
            latitude: 42.68,
            longitude: -73.75
        },
        zoom: 12,
        control: {}
    };

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
          return val.length == 2 ? val : '0'+val;
        };

        var r = getStr(25);
        var g = getStr(30);
        var b = getStr(100);
        $scope.colors[num] = {color:'#'+r+g+b};
      }

      return $scope.colors[num].color
    };
    var dataStyleOptions = function(feature) {
      var num = feature.getProperty('dataset');
      var color = makeColor(num);
      return ({
        icon: icons(color),
        fillColor: color,
        fillOpacity: .3,
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

    var init_datalayer = function(num){
      $scope.dataLayers[num] = new google.maps.Data();
      $scope.dataLayers[num].setStyle(dataStyleOptions);
    };

    $scope.map.events={
      tilesloaded: function(map,eventName,args){
        resetBounds();
        $scope.mapInstance = map;
        $scope.stopStart();
      },
      bounds_changed: function(map,eventName,args){
        resetBounds();
        for (num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };

    $scope.loadDataset= function(dataset){
      if (stop){return;}
      params = envService.getBoundingBox();
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
        var temp_markers = getServices.mapElement.query(params,function(){
          $scope.dataLayers[dataset].addGeoJson(temp_markers.results); 

          if (temp_markers.next  && !stop){
            recursiveLoadPoints(params.page+1);
          } else if (stop){
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
      stop = true;
      $scope.dataLayers = {};
      stop = false;
      for (num in envService.getActiveDatasets()){
        if (!$scope.dataLayers.hasOwnProperty(num)){
          init_datalayer(num);
        }
          $scope.loadDataset(num);
        }
      
    };
    $scope.applyFilter = function(){
      var tags = sharedTagService.getFilterByList();
      for (var layer in $scope.dataLayers){
        $scope.dataLayers[layer].forEach(function(feature) {
          if (tags.length  == 0){
            $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
          } else if (sharedTagService.getMatch() == 'all'){
            for (var tag in tags){
              if ($.inArray(tags[tag],feature.getProperty('tags')) == -1){
                $scope.dataLayers[layer].overrideStyle(feature, {visible: false});
              } else {
                $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }
          } else {
            $scope.dataLayers[layer].overrideStyle(feature, {visible: false});
            for (var tag in tags){
              if ($.inArray(tags[tag],feature.getProperty('tags')) > -1){
                $scope.dataLayers[layer].overrideStyle(feature, {visible: true});
              }
            }

          }
        });
      }
    };
    $scope.stopStart = function(){
      stop = !stop;
      if (!stop){
        for (num in envService.getActiveDatasets()){
          $scope.loadDataset(num);
        }
      }
    };
  	$scope.toggleActivatedDataset = function (dataset){
  		if (dataset.active) {
  		//just activated, this is tied to checkbox
        stop = false;
  			sharedTagService.addTags(dataset);
	      envService.addActiveDataset(dataset.id);
        if (!$scope.dataLayers.hasOwnProperty(dataset.id)){
          init_datalayer(dataset.id);
        }
        $scope.dataLayers[dataset.id].setMap($scope.mapInstance);
	      $scope.loadDataset(dataset.id);
	  	} else {
        stop = true;
        sharedTagService.removeTags(dataset);
        envService.removeActiveDataset(dataset.id);
        $scope.dataLayers[dataset.id].setMap(null);
        $scope.stopStart();
	  	}
  	};
	}]);