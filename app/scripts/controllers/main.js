'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')

  .controller('MainCtrl',function ($scope,$http,$routeParams,$modal,$resource, dataSource, dataFeed,dataEdit,djResource) {

    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = {};
    $scope.dataTag = {};
    $scope.dataset1={};
    $scope.dataset2={};
    $scope.dataset3={};

    $scope.tagObject={};
    $scope.saveTag=function(){
        $scope.dataTag={
            id:$scope.tagObject.id,
            nameTag:$scope.tagObject.nameTag,
            descriptionTag:$scope.tagObject.descriptionTag,
            outputTagSelect:$scope.tagObject.outputTagSelect,
            addNewTag:$scope.tagObject.addNewTag
        };
        var tagId=$scope.dataTag.id;
        
        for(var i=$scope.data.length-1;i>=0;i--){
            if(tagId==$scope.data[i].id){
                $scope.data[i].name=$scope.dataTag.nameTag;
                $scope.data[i].city=$scope.dataTag.descriptionTag;
                $scope.data[i].tags.push($scope.dataTag.addNewTag);
                for(var index in $scope.data[i].tags){
                    console.log($scope.data[i].tags[index]);
                }
                
            }
        }    
        var k=56496;
        var temp=djResource('http://107.170.106.235/api-mp/56496/',{id:56496});
        $scope.animal=temp.query();
        console.log($scope.animal);
        //var tempdata = dataEdit.get({ id:56496 });
         //var id = tempdata.id;

       // Now call update passing in the ID first then the object you are updating
       //dataEdit.update({ id:id }, tempdata);

       // This will PUT /notes/ID with the note object in the request payload

        for(var i in $scope.data){
            for(var j in $scope.data[i]){
                if(tagId==$scope.data[i][j].id){
                    $scope.data[i][j].tags=$scope.dataTag.addNewTag;
                    console.log($scope.data[i][j].tags);

                }
            }
        }                
    };
     // TagsModal info window
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
                    $scope.multiTags=temp[j].tags;
                    console.log("Tags");
                    console.log($scope.multiTags.tags);
                    tagsModal.$promise.then(tagsModal.show);
                } 
            }    
        } 
    };
    // $scope.currentLocation=new google.maps.OverlayView();
    // // overlay.draw = function() {};
    // //     overlay.setMap(map);
    // // $scope.drawmarker=function(){

    // };

    //DRAWING TOOLBAR
    // $scope.drawingManager = new google.maps.drawing.DrawingManager({
    //     drawingMode: google.maps.drawing.OverlayType.MARKER,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: google.maps.ControlPosition.TOP_CENTER,
    //         drawingModes: [
    //             google.maps.drawing.OverlayType.MARKER,
    //             google.maps.drawing.OverlayType.CIRCLE,
    //             google.maps.drawing.OverlayType.POLYGON,
    //             google.maps.drawing.OverlayType.POLYLINE,
    //             google.maps.drawing.OverlayType.RECTANGLE
    //         ]
    //     },
    //     markerOptions: {
    //         icon: 'images/beachflag.png'
    //     },
    //     circleOptions: {
    //         fillColor: '#ffff00',
    //         fillOpacity: 1,
    //         strokeWeight: 5,
    //         clickable: false,
    //         editable: true,
    //         zIndex: 1
    //     }
    // });
     // drawingManager.setMap($scope.map);

    //DRAWING TOOLBAR-END
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
             dblclick:function(marker){
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
    // $scope.resetInfo=function(markerKey){
    //     for(var index in $scope.APIMArker){
    //         for(var jindex in $scope.APIMArker[index]){
    //             if(markerKey==$scope.APIMArker[index][jindex].id){
    //                 console.log("called");

    //             }
    //             else{
    //                 $scope.APIMArker[index][jindex].showWindow=false;
    //                 console.log('reset info called');
    //             }
    //         }
    //     }
    // };
});
