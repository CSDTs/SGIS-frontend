'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
    // .directive('autoComplete', function($timeout,$scope,$http,$routeParams,$modal,$resource, dataSource, dataFeed,dataEdit,djResource,polygonService,tagService,tagFiltering) {
    // return function(scope, iElement, iAttrs) {
    //         iElement.autocomplete({
    //             source: scope[iAttrs.uiItems],
    //             select: function() {
    //                 $timeout(function() {
    //                   iElement.trigger('input');
    //                 }, 0);
    //             }
    //         });
    //     };
    // })
  .controller('MainCtrl',function ($scope,$http,$routeParams,$modal,$resource,$timeout, dataSource, dataFeed,dataEdit,djResource,polygonService,tagService,tagFiltering) {

    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = {};
    $scope.dataTag = {};
    $scope.dataset1={};
    $scope.dset1={};
    $scope.dataset2={};
    $scope.dset2={};
    $scope.dataset3={};
    $scope.dset3={};
    $scope.multiTags=[];
    $scope.tagObject={};
    $scope.polyData=[];
    $scope.singleModel = false;
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
        var notes=$scope.Poll;
        console.log("dataEdit");
        console.log($scope.dataTag.outputTagSelect);
        for(var k in $scope.dataTag.outputTagSelect){
          $scope.product={};
          $scope.product.mappoint=tagId;
          $scope.product.tag=$scope.dataTag.outputTagSelect[k].id;
          var product =new dataEdit($scope.product);
          console.log($scope.dataTag.outputTagSelect[k].id);
          console.log($scope.product.mappoint);
          product.$create();
        }
        // $scope.product={};
        // $scope.product.mappoint=14;
        // $scope.product.tag=4;
        // var product =new dataEdit($scope.product);
        // product.$create();



      //  dataEdit.create({ id:tagId }, notes);
        console.log("notes");


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
   
    $scope.selectedTag = '';
    $scope.states = ['fruits', 'vegetables', 'organic vegetables', 'bus accessible', 'local foods'];

    $scope.Default=function(){
        $scope.dataset1=
    };
    $scope.checkFilter=function(){
        console.log('HI'); 
        if(selectedTag=''){

        }
        var filterData=tagFiltering.query({selectedTag:$scope.selectedTag},function(){
            $scope.dataset1=filterData;
            for(var l=0 ;l<=$scope.dataset1.length-1;l++){
                 $scope.dataset1[l].img=$scope.image.marker1;
                 console.log($scope.dataset1[l].img);
            }
        });
        console.log('Tag Filtering');
        console.log($scope.dataset1);   
    };
    
    //Adding polygons
    //
    // $http.get('fake_data/test_neighbourhood.json').success(function(dataPoly){
    //     $scope.poly1=dataPoly;
    //  });

    $scope.fillcolor={
        color:'#63C3F2',
        opacity: '0.2'
    };
    $scope.strokecolor={
        weight: 1,
        color: '#505250',
        opacity: 0.6
    };
    $scope.user={
        dataset:['dara']
    };
    $scope.onSelect = function(dataSourceId) {
        if($scope.data[dataSourceId] !== undefined) {
            $scope.data[dataSourceId] = undefined;
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
            for(var l=0 ;l<=$scope.dataset1.length-1;l++){
                 $scope.dataset1[l].img=$scope.image.marker1;
                 console.log($scope.dataset1[l].img);
            }
           
            console.log('Image');
            //console.log($scope.dataset1[0].img);
            $scope.tag1=$scope.data[dataSourceId].tags;
        }
        else if(dataSourceId==2){
            $scope.dataset2=$scope.data[dataSourceId];
            for(var l=0 ;l<=$scope.dataset2.length-1;l++){
                 $scope.dataset2[l].img=$scope.image.marker1;
                 console.log($scope.dataset2[l].img);
            }
            
        }
        else if(dataSourceId==3){
            $scope.dataset3=$scope.data[dataSourceId];
            for(var l=0 ;l<=$scope.dataset3.length-1;l++){
                 $scope.dataset3[l].img=$scope.image.marker1;
                 console.log($scope.dataset3[l].img);
            }
            
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
        $scope.map.zoom=11;

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
    var onMarkerClicked = function (marker) {
        marker.showWindow = true;
        $scope.$apply();
    };
    $scope.showWindow=false;
    _.each($scope.dataset1, function (marker) {
        marker.closeClick = function () {
          marker.showWindow = false;
          $scope.$apply();
        };
        marker.onClicked = function () {
            onMarkerClicked(marker);
        };
    });

    $scope.editTagEvents={
        options:{
            draggable:true},
        events:{
            mouseover:function(marker){

                onMarkerClicked(marker);
                console.log(marker);
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
        farm:'./images/farmstand.png',
        home: './images/home.png',
        circle: './images/measle_blue.png',
        marker1:'./images/measle_blue.png'
    };
    $scope.hello=function(){
        alert('hello');
        $scope.$apply();
    };
    $scope.AddwithDescription=function(){
        $scope.editTodo=true;
        console.log('Hi');
    };
    //Polygon Services Fetching
    $scope.showHidePoly=function(){
        $scope.singleModel= !$scope.singleModel;
        if($scope.singleModel==true){
            console.log($scope.singleModel);
            $scope.polygonFunc();

        }
        else{
            $scope.polyData=[];
            console.log($scope.singleModel);
        }
    };
    $scope.polygonFunc=function(){
        var polyData=polygonService.query(function(){
          var polyData1=polyData;
          console.log(polyData1);
        });
        $scope.polyData=polyData;
        // var promObj=polygonService.query().$promise.then(function(){
        //   $scope.polyData=promObj;
        // });
        // $scope.polyData=promObj;
        // console.log($scope.polyData);
    };

    $scope.polygonEvents={
        mouseover:function mouseOverFn(polygon, eventName, polyMouseEvent) {
            var polygonScopeObject = this.polygon, scope = this.scope;
            console.log(polygon);
            console.log(eventName);
            console.log(polyMouseEvent);
            scope.$apply(function() {
                polygonScopeObject.selected = !polygonScopeObject.selected;
                // Change colors or whatever you want via the polygon_scope_object
            });
        },
        click:function(polygon, eventName, polyMouseEvent) {
            //var polygonScopeObject = this.polygon, scope = this.scope;
             console.log(polygon);
             console.log(eventName);
             console.log(polygon.fillColor);
             polygon.fillColor=$scope.fillcolor.color;
             polygon.strokeColor=$scope.strokecolor.color;
             polygon.fillOpacity=$scope.fillcolor.opacity;
             polygon.strokeOpacity=$scope.strokecolor.opacity;
             alert(polygon.strokeOpacity);
             //$scope.$apply();
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
