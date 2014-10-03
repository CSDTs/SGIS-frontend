'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('MainCtrl',function ($scope,$http,$routeParams,$modal,$resource,$timeout, dataSource, dataFeed,dataEdit,djResource,polygonService,tagService,tagFiltering,locationService) {

    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = [];
    var dataSourceId=1;
    $scope.d1 = [];
    $scope.dataTag = {};
    $scope.dataset1={};
    $scope.dset1={};
    $scope.dataset2={};
    $scope.dset2={};
    $scope.dataset3={};
    $scope.dataset4=[];
    $scope.pageNum=1;
    $scope.pagePolygon=1;
    $scope.dset3={};
    $scope.multiTags=[];
    $scope.tagObject={};
    $scope.polyData=[];
    $scope.polyData1=[];
    $scope.polyData2=[];
    $scope.maxLon=0;
    $scope.minLon=0;
    $scope.maxLat=0;
    $scope.minLat=0;
    $scope.matchModel='any';
    $scope.singleModel = false;
    $scope.selectedTagUrl='';
    var dataset1Values=139;
    var curDataSet1Values = 1;
    var dataset2Values=4;




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
        //var notes=$scope.Poll;
        console.log('dataEdit');
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
        console.log('notes');


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
                if(markerkey===temp[j].id){
                    $scope.tagObject.nameTag=temp[j].name;
                    $scope.tagObject.descriptionTag=temp[j].city;
                    $scope.tagObject.id=temp[j].id;
                    $scope.tagObject.addNewTag=temp[j].tags;
                    $scope.tagObject.multiTags=temp[j].tags;
                    $scope.tagObject.outputTagSelect=temp[j].tags;
                    // console.log($scope.tagObject.outputTagSelect);
                     console.log('Tags');
                    // console.log($scope.multiTags.tags);
                    tagsModal.$promise.then(tagsModal.show);
                }
            }
        }
    };

    $scope.loadTags = function(query) {
        console.log(query);
        return tagService.query().$promise;
    };
   
    $scope.selectedTag = '';
    $scope.states = ['fruits', 'vegetables', 'organic vegetables', 'bus accessible', 'local foods'];
    $scope.isEmpty=function(obj) 
    { 
        for(var prop in obj)
        { 
            if(obj.hasOwnProperty(prop)) {
                return false; 
            }
        }
        return true;
    };
    $scope.Default=function(){
        if($scope.isEmpty($scope.dataset1)){
            console.log('Null');
        }
        else{
            $scope.dataset1=$scope.dset1;
        }

        if($scope.isEmpty($scope.dataset2)){
            console.log('Null');
        }
        else{
            $scope.dataset2=$scope.dset2;
        }

        if($scope.isEmpty($scope.dataset3)){
            console.log('Null');
        }
        else{
            $scope.dataset3=$scope.dset3;
        }
    };
    $scope.dataset5=[];

    $scope.LocationCheck=function(){
        $scope.pageNum=1;
        $scope.dataset5=[];
        $scope.dataset4=[];

    //     $scope.dataset5=locationService.query(
    //                         {
    //                             minLat:$scope.minLat,
    //                             minLon:$scope.minLon,
    //                             maxLat:$scope.maxLat,
    //                             maxLon:$scope.maxLon,
    //                             pageNum:$scope.pageNum
    //                         }).$promise.then(loc);
    // };

    // function loc(data) { 
    //     var results=data.results;
    //     $scope.dataset4.push(results);
    //     if((data.count/100<=$scope.pageNum)){
    //         console.log("Reached null");
    //     }
    //     else{
    //         $scope.pageNum=$scope.pageNum+1;
    //         locationService.query(
    //                 {
    //                     minLat:$scope.minLat,
    //                     minLon:$scope.minLon,
    //                     maxLat:$scope.maxLat,
    //                     maxLon:$scope.maxLon,
    //                     pageNum:$scope.pageNum
    //                 }).$promise.then(loc);      
    //     }   
    }
    $scope.checkFilter=function(){
        
        // First we will check which checbox is selected,If we have selected any --> any filtering will be done and 
        //if Match All is done, we will have MATch all filtering is done
        // $scope.matchmodel--> will tell about the type of filter
        // Actually by default, it is any and for match ALL we need to use match =ALL
            $scope.selectedTagUrl='';
            for(var m=0 ;m<=$scope.selectedTag.length-2;m++){
                
                $scope.selectedTagUrl=$scope.selectedTagUrl+$scope.selectedTag[m].tag+',';
            }
            $scope.selectedTagUrl=$scope.selectedTagUrl+$scope.selectedTag[$scope.selectedTag.length-1].tag;
            
            console.log('URL');
            console.log($scope.selectedTagUrl);

        if($scope.isEmpty($scope.dataset1)){
            console.log('Null');
        }
        else{
            
            
            var filterData1=tagFiltering.query({selectedTag:$scope.selectedTagUrl, dataId:'1', matchModel:$scope.matchModel},function(){
            $scope.dataset1=filterData1;
            // for(var l=0 ;l<=$scope.dataset1.length-1;l++){
            //      $scope.dataset1[l].img=$scope.image.marker1;
            //      console.log($scope.dataset1[l].img);
            // }
        });
        }
        if($scope.isEmpty($scope.dataset2)){
            console.log('Null');
        }
        else{
        
        var filterData2=tagFiltering.query({selectedTag:$scope.selectedTagUrl, dataId:'2', matchModel:$scope.matchModel},function(){
            $scope.dataset2=filterData2;
            // for(var l=0 ;l<=$scope.dataset2.length-1;l++){
            //      $scope.dataset2[l].img=$scope.image.marker1;
            //      console.log($scope.dataset2[l].img);
            // }
        });
        }
    };
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
    function q(data) {
            //$scope.data[dataSourceId].push(data);
            $scope.d1.push(data);
            console.log($scope.d1);
            console.log('ajao');
            if(curDataSet1Values<dataset1Values) {
                curDataSet1Values += 1;
                console.log('increasing count');
                dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':curDataSet1Values}).$promise.then(q);
            }
    }
    $scope.onSelect = function(dataSourceId) {
        
       
        if($scope.data[dataSourceId] !== undefined) {
            $scope.data[dataSourceId] = undefined;
            $scope.resetValues(dataSourceId);  
        }
        else
        {
            
          //  dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':curDataSet1Values}).$promise.then(q);

            //var dataset1Values=;
            if(dataSourceId===1){

                // function q(data) {
                //     $scope.dataset1.append(data);
                //     if(curDataSet1Values < dataset1Values) {
                //         curDataSet1Values += 1;
                //         dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':curDataSet1Values}).$promise.then(q);
                //     }
                // }
                $scope.data[dataSourceId]=dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':curDataSet1Values}).$promise.then(q);
                // for(var u=1;u<=dataset1Values;u++)
                // {
                //     $scope.data[dataSourceId] = dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':u});
                //     $scope.data[dataSourceId].$promise.then(function (result) {
                //         $scope.data[dataSourceId]=result;
                //         console.log($scope.data[dataSourceId]);
                //     });
                //     //console.log($scope.data[dataSourceId]);
                // } 
                $scope.dataset1=$scope.d1;
                console.log('final');
                console.log($scope.d1);
                //$scope.setValues(dataSourceId);
            }
            else if(dataSourceId===2){
                for(var v=1;v<=dataset2Values;v++)
                {  
                    $scope.data[dataSourceId] = dataFeed.query({'dataSourceId':dataSourceId,'dataSetValues':v});
                    $scope.data[dataSourceId].$promise.then(function (result) {
                        $scope.data[dataSourceId]=result;
                        console.log($scope.data[dataSourceId]);
                    });
                } 
                 
                $scope.setValues(dataSourceId);
            }
        }
        
    };
   
    $scope.resetValues=function(dataSourceId){
         if(dataSourceId===1){
                $scope.dataset1={};   
            }
            else if(dataSourceId===2){
                $scope.dataset2={};
            }
            else if(dataSourceId===3){
                $scope.dataset3={};
            }
    };
    $scope.setValues=function(dataSourceId){

        if(dataSourceId===1){

            $scope.dataset1=$scope.data[dataSourceId];
            $scope.dataset1=$scope.d1;
            console.log($scope.dataset1);
            $scope.dset1=$scope.dataset1;
            // for(var l=0 ;l<=$scope.dataset1.length-1;l++){
            //      $scope.dataset1[l].img=$scope.image.marker1;
            //      console.log($scope.dataset1[l].img);
            // }
           
            // console.log('Image');
            //console.log($scope.dataset1[0].img);
            $scope.tag1=$scope.data[dataSourceId].tags;  //abhi comment kara thain 7:00
        }
        else if(dataSourceId===2){
            $scope.dataset2=$scope.data[dataSourceId];
            $scope.dset2=$scope.dataset2;
            // for(var l=0 ;l<=$scope.dataset2.length-1;l++){
            //      $scope.dataset2[l].img=$scope.image.marker1;
            //      console.log($scope.dataset2[l].img);
            // }
            
        }
        else if(dataSourceId===3){
            $scope.dataset3=$scope.data[dataSourceId];
            $scope.dset3=$scope.dataset3;
            // for(var l=0 ;l<=$scope.dataset3.length-1;l++){
            //      $scope.dataset3[l].img=$scope.image.marker1;
            //      console.log($scope.dataset3[l].img);
            // }
            
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
        $scope.maxLon=0;
        $scope.minLon=0;
        $scope.maxLat=0;
        $scope.minLat=0;
        $scope.newMark.location={
            latitude: $scope.details.geometry.location.k,
            longitude: $scope.details.geometry.location.B
        };
        $scope.map.center.latitude=$scope.newMark.location.latitude;
        $scope.map.center.longitude=$scope.newMark.location.longitude;
       // $scope.map.zoom=11;
        $scope.maxLon=$scope.newMark.location.longitude+0.25;
        $scope.minLon=$scope.newMark.location.longitude-0.25;
        $scope.maxLat=$scope.newMark.location.latitude+0.25;
        $scope.minLat=$scope.newMark.location.latitude-0.25;
        $scope.LocationCheck();
        $scope.polygonFunc();
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
                //var pos = marker.getPosition();
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
        window.alert('hello');
        $scope.$apply();
    };
    $scope.AddwithDescription=function(){
        $scope.editTodo=true;
        console.log('Hi');
    };
    //Polygon Services Fetching
    $scope.showHidePoly=function(){
        $scope.singleModel= !$scope.singleModel;
        if($scope.singleModel===true){
            console.log($scope.singleModel);
            $scope.polygonFunc();

        }
        else{
            $scope.polyData=[];
            console.log($scope.singleModel);
        }
    };
    $scope.polygonFunc=function(){
        $scope.pagePolygon=1;
        $scope.polyData=[];
        $scope.polyData1=[];
        var maxLon=$scope.newMark.location.longitude+0.07;
        var minLon=$scope.newMark.location.longitude-0.07;
        var maxLat=$scope.newMark.location.latitude+0.07;
        var minLat=$scope.newMark.location.latitude-0.07;
        $scope.polyData=polygonService.query(
                            {
                                minLat:minLat,
                                minLon:minLon,
                                maxLat:maxLat,
                                maxLon:maxLon,
                                pagePoly:$scope.pagePolygon
                            }).$promise.then(polyServiceCall); 
    };
    function polyServiceCall(dataPoly) { 
        var m=dataPoly.results.length;
        console.log(m);
        for(var i=0; i < dataPoly.results.length-1; i+= 1) {
            $scope.polyData1.push(dataPoly.results[i]);
            console.log('Added');
            console.log(dataPoly.results[i]);
        }
        if(dataPoly.next!=='null'){
            console.log('how many times');
            $scope.pagePolygon=$scope.pagePolygon+1;
            console.log($scope.pagePolygon);
            polygonService.query(
                {
                    minLat:$scope.minLat,
                    minLon:$scope.minLon,
                    maxLat:$scope.maxLat,
                    maxLon:$scope.maxLon,
                    pagePoly:$scope.pagePolygon
                }).$promise.then(polyServiceCall);     
        }  
    
}
    $scope.polygonEvents={
       // mouseover:function mouseOverFn(polygon, eventName, polyMouseEvent) {
            // var polygonScopeObject = this.polygon, scope = this.scope;
            // console.log(polygon);
            // console.log(eventName);
            // console.log(polyMouseEvent);
            // scope.$apply(function() {
            //     polygonScopeObject.selected = !polygonScopeObject.selected;
            //     // Change colors or whatever you want via the polygon_scope_object
            // });
      //  },
        // click:function(polygon, eventName, polyMouseEvent) {
            //var polygonScopeObject = this.polygon, scope = this.scope;
             // console.log(polygon);
             // console.log(eventName);
             // console.log(polygon.fillColor);
             // polygon.fillColor=$scope.fillcolor.color;
             // polygon.strokeColor=$scope.strokecolor.color;
             // polygon.fillOpacity=$scope.fillcolor.opacity;
             // polygon.strokeOpacity=$scope.strokecolor.opacity;
             // google.windows.alert(polygon.strokeOpacity);
             //$scope.$apply();
            // console.log(polyMouseEvent);

            // scope.$apply(function() {
            //     polygonScopeObject.selected = !polygonScopeObject.selected;
            //     // Change colors or whatever you want via the polygon_scope_object
            // });
      //  }
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
