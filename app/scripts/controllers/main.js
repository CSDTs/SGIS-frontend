'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')

  .controller('MainCtrl',function ($scope,$http,$routeParams,$modal,$resource, dataSource, dataFeed,dataEdit,djResource,polygonService,tagService) {

    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = {};
    $scope.dataTag = {};
    $scope.dataset1={};
    $scope.dataset2={};
    $scope.dataset3={};
    $scope.multiTags=[];
    $scope.tagObject={};
    $scope.polygonData={};
    $scope.saveTag=function(){
        $scope.dataTag={
            id:$scope.tagObject.id,
            nameTag:$scope.tagObject.nameTag,
            descriptionTag:$scope.tagObject.descriptionTag,
            outputTagSelect:$scope.tagObject.outputTagSelect,
            addNewTag:$scope.tagObject.addNewTag
        };
        var tagId=$scope.dataTag.id;

        // for(var i=$scope.data.length-1;i>=0;i--){
        //     if(tagId==$scope.data[i].id){
        //         $scope.data[i].name=$scope.dataTag.nameTag;
        //         $scope.data[i].city=$scope.dataTag.descriptionTag;
        //         $scope.data[i].tags.push($scope.dataTag.addNewTag);
        //         for(var index in $scope.data[i].tags){
        //             console.log($scope.data[i].tags[index]);
        //         }

        //     }
        // }
        $scope.Poll={};
        var temp=$resource('http://107.170.106.235/api-mp/:id/',{id:tagId});
        temp.get({id:tagId})
        .$promise.then(function(tagobj){
            $scope.Poll=tagobj;
            $scope.Poll.readByUser=true;
        });
        $scope.Poll.tags=$scope.dataTag.outputTagSelect;
        dataEdit.update({ id:tagId }, $scope.Poll);
       // Now call update passing in the ID first then the object you are updating
       // This will PUT /notes/ID with the note object in the request payload
    };

     //Showing TagsModal info window
    var tagsModal = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
    $scope.makeModal = function(markerkey) {
        console.log(markerkey);

        console.log($scope.data.length);
        for(var index in $scope.data){
            var temp=$scope.data[index];
            console.log(temp);
            for(var j in temp){
                if(markerkey==temp[j].id){
                    $scope.tagObject.nameTag=temp[j].name;
                    $scope.tagObject.descriptionTag=temp[j].city;
                    $scope.tagObject.id=temp[j].id;
                    $scope.tagObject.addNewTag=temp[j].tags;
                    $scope.tagObject.multiTags=temp[j].tags;
                    $scope.tagObject.outputTagSelect=temp[j].tags;
                    // console.log($scope.tagObject.outputTagSelect);
                    // console.log("Tags");
                    // console.log($scope.multiTags.tags);
                    tagsModal.$promise.then(tagsModal.show);
                }
            }
        }
    };

    $scope.loadTags = function(query) {
        return tagService.query().$promise;
    };

    //Adding polygons
    $scope.singleModel = 1;
    $http.get('fake_data/test_neighbourhood.json').success(function(dataPoly){
        $scope.poly1=dataPoly;
     });
    $scope.showHidePoly=function(){
        if($scope.singleModel===1){
            $scope.polyShowArray=$scope.poly1;
        }
        else{
            $scope.polyShowArray=null;
        }
    };
    $scope.fillcolor={
        color:'#63C3F2',
        opacity: '0.2'
    };
    $scope.strokecolor={
        weight: 1,
        color: '#505152',
        opacity: 1
    };
    $scope.user={
        dataset:['dara']
    };
    $scope.onSelect = function(dataSourceId) {
        if($scope.data[dataSourceId] !== undefined) {
            $scope.data[dataSourceId] = {};
            $scope.resetValues(dataSourceId);
        }
        else
        {
            $scope.data[dataSourceId] = dataFeed.query({'dataSourceId':dataSourceId});
            $scope.data[dataSourceId].$promise.then(function (result) {
                $scope.data[dataSourceId] = result;
                console.log($scope.data[dataSourceId]);
                $scope.setValues(dataSourceId);
            });
        }
    };
    $scope.resetValues=function(dataSourceId){
         if(dataSourceId==1){
                $scope.dataset1={};
            }
            else if(dataSourceId==2){
                $scope.dataset2={};
            }
            else if(dataSourceId==3){
                $scope.dataset3={};
            }
    };
    $scope.setValues=function(dataSourceId){

        if(dataSourceId==1){
            $scope.dataset1=$scope.data[dataSourceId];
            $scope.tag1=$scope.data[dataSourceId].tags;
        }
        else if(dataSourceId==2){
            $scope.dataset2=$scope.data[dataSourceId];
        }
        else if(dataSourceId==3){
            $scope.dataset3=$scope.data[dataSourceId];
        }



        console.log('Setting values');
        console.log('Dataset1'+$scope.dataset1);
        console.log('end');
        console.log($scope.data[dataSourceId]);
        console.log($scope.dataset1);
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
    };
    $scope.map = {
    	center: {
    	  	latitude: 42.678681,
    	  	longitude: -73.741265
    	},
    	zoom: 7,
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
    $scope.symbol={
      path: window.google.maps.SymbolPath.CIRCLE,
      scale: 5
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
    $scope.showWindow=false;
    $scope.editTagEvents={
        options:{
            draggable:true},
        events:{
            mouseover:function(marker){
                console.log(marker);
                marker.showWindow=true;
            },
             click:function(marker){
                console.log('dbl clicked');
                var pos = marker.getPosition();
                var markerKey=marker.key;
                $scope.makeModal(markerKey);
            }
        }
    };

    $scope.infoWindowWithCustomClass= {
        options: {
            boxClass: 'custom-info-window'
        }
    };
    $scope.image={
        farm:"./images/farmstand.png",
        home: "./images/home.png",
        circle: "./images/measle_blue.png"
    };
    $scope.hello=function(){
        alert("hello");
        $scope.$apply();
    };
    $scope.AddwithDescription=function(){
        $scope.editTodo=true;
        console.log('Hi');
    };
    //Polygon Services Fetching
    $scope.polygonData={};
    $scope.polygonFunc=function(){


        var polyData=polygonService.query(function(){
          var polyData1=polyData;
          console.log(polyData1);
        });
        $scope.polygonData=polyData;
    };



    $scope.polygonEvents={
        // mouseover:function mouseOverFn(polygon, eventName, polyMouseEvent) {
        //     var polygonScopeObject = this.polygon, scope = this.scope;
        //     console.log(polygon);
        //     console.log(eventName);
        //     console.log(polyMouseEvent);
        //     scope.$apply(function() {
        //         polygonScopeObject.selected = !polygonScopeObject.selected;
        //         // Change colors or whatever you want via the polygon_scope_object
        //     });
        // },
        click:function(polygon, eventName, polyMouseEvent) {
            //var polygonScopeObject = this.polygon, scope = this.scope;
             console.log(polygon);
             console.log(eventName);
             polygon.fillColor="#ffffff";
             $scope.$apply();
            // console.log(polyMouseEvent);

            // scope.$apply(function() {
            //     polygonScopeObject.selected = !polygonScopeObject.selected;
            //     // Change colors or whatever you want via the polygon_scope_object
            // });
        }
        //   ,
        // mouseout:function mouseOutFn(polygon, eventName, polyMouseEvent) {
        //     var polygonScopeObject = this.polygon, scope = this.scope;
        //     console.log(polygon);
        //     console.log(eventName);
        //     console.log(polyMouseEvent);
        //     scope.$apply(function() {
        //         polygonScopeObject.selected = !polygonScopeObject.selected;
        //         // Change colors or whatever you want via the polygon_scope_object
        //     });
        // }
    };

});
