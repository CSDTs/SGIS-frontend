
angular.module('map-module',['uiGmapgoogle-maps','sgisServices'])
	.controller('MapController',['$scope','config','envService','sharedTagService','getServices','uiGmapGoogleMapApi',function ($scope,config,envService,sharedTagService,getServices,uiGmapGoogleMapApi) {
		var mapCtrl = $scope;
		$scope.map = {
			control: {},
			events: {
				tilesloaded: function(map,eventName,args){
					envService.init();
					var bounds = $scope.map.control.getGMap().getBounds();
					envService.setBoundingBox({
						maxLat: bounds.getNorthEast().lat(),
						maxLon: bounds.getNorthEast().lng(), 
						minLat: bounds.getSouthWest().lat(), 
						minLon: bounds.getSouthWest().lng()
					});
				}
			},
			draggable: true,
			markers: [],

		};
		$scope.map.zoom = config.map.starting.zoom;
		$scope.map.center = config.map.starting.center;
		this.points = [];
		this.temp = {
				type:"Point",
				coordinates:[-73.75482,42.6465]
			
		};
		//{coords:,options:,events:,id:}

        $scope.loadDataset= function(dataset){
          if (this.stop){return;}
          mapCtrl.dataset = dataset.id;
          mapCtrl.params = envService.getBoundingBox();
          mapCtrl.params.tag = sharedTagService.getTagList();
          mapCtrl.params.match = sharedTagService.getMatch();
          mapCtrl.params.page = 1;
  
          mapCtrl.map.points = getServices.mapElement.query(mapCtrl.params,function() {
            var temp = mapCtrl.map.points;
            mapCtrl.map.points = mapCtrl.map.points.results.features;
            var recursiveLoad = function(num){
              mapCtrl.params.page = num;
              temp = getServices.mapElement.query(mapCtrl.params,function(){
                mapCtrl.map.points = mapCtrl.map.points.concat(temp.results.features);
                if (temp.next != null && !mapCtrl.stop){
                  recursiveLoad(num+1);
                }else{
                	$scope.$apply();
                }
              });
            };
            if (temp.next!=null && !mapCtrl.stop){
              recursiveLoad(2);
            }

          });
        };
		uiGmapGoogleMapApi.then(function(maps) {
		});


  	  this.toggleActivatedDataset = function (dataset){
  		if ($scope.dataset.active) {
  		/*just activated, this is tied to checkbox*/
  			mapCtrl.map.points = [{type:"Feature",geometry:{type:"Point",coordinates:[-73.75482,42.6465]},properties:{id:5003}}];
	  		//sharedTagService.addTags($scope.dataset);
	        //envService.addActiveDataset($scope.dataset.id);
	        //$scope.loadDataset($scope.dataset.id);
	  	} else {
	        sharedTagService.removeTags($scope.dataset);
	        envService.removeActiveDataset($scope.dataset.id);
	  	}
	        console.log(mapCtrl.map.points);
  	  };
	}]);
