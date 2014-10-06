'use strict';

/**
 * @ngdoc function
 * @name socialjusticeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the socialjusticeApp
 */
angular.module('socialjusticeApp')
  .controller('MainCtrl',function ($scope,$http,$routeParams,
                                $modal,$resource,$timeout, 
                                dataSource, dataFeed,dataEdit,
                                djResource,polygonService,tagService,
                                tagFiltering,locationService) 
    {
    var google = window.google;
    $scope.sources = dataSource.query();
    $scope.data = {};
    $scope.dataShow={};
    $scope.dataDuplicate = {};
    $scope.dataTemp={};
    $scope.innerarray=[];
    $scope.selectedSource={};
    $scope.selectedSourceDisabled={};  // reprsents the sources selected in the checkbox
    $scope.temp=[];
    $scope.pageFeed=1;
    $scope.dataTag = {};
    var dataSourceId=1;
    $scope.dataset1={};
    $scope.dset1={};
    $scope.dataset2={};
    $scope.dset2={};
    $scope.dataset3={};
    $scope.dataLocation=[];
    $scope.pageNum=1;
    $scope.pagePolygon=1;
    $scope.dset3={};
    $scope.multiTags=[];
    $scope.tagObject={};
    $scope.polyData=[];
    $scope.polyData1=[];
    $scope.maxLon=0;
    $scope.minLon=0;
    $scope.maxLat=0;
    $scope.minLat=0;
    $scope.matchModel='any';
    $scope.singleModel = false;
    $scope.selectedTagUrl='';
    $scope.saveTag=function(){
        $scope.dataTag={
            id:$scope.tagObject.id,
            nameTag:$scope.tagObject.nameTag,
            descriptionTag:$scope.tagObject.descriptionTag,
            outputTagSelect:$scope.tagObject.outputTagSelect,
            addNewTag:$scope.tagObject.addNewTag
        };
        var tagId=$scope.dataTag.id;
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
    };
     //Showing TagsModal info window
    var tagsModal = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
    $scope.makeModal = function(markerkey) {
        console.log(markerkey);
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
        var temp=$scope.dataLocation;

        for(var j in temp){
            if(markerkey===temp[j].id){
                console.log("aayush");
                $scope.tagObject.nameTag=temp[j].name;
                $scope.tagObject.descriptionTag=temp[j].city;
                $scope.tagObject.id=temp[j].id;
                $scope.tagObject.addNewTag=temp[j].tags;
                $scope.tagObject.multiTags=temp[j].tags;
                $scope.tagObject.outputTagSelect=temp[j].tags;
                console.log('Tags');
                tagsModal.$promise.then(tagsModal.show);
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
        $scope.dataDuplicate=$scope.data;


        // if($scope.isEmpty($scope.dataset1)){
        //     console.log('Null');
        // }
        // else{
        //     $scope.dataDuplicate=$scope.data;
        // }

        // if($scope.isEmpty($scope.dataset2)){
        //     console.log('Null');
        // }
        // else{
        //     $scope.dataset2=$scope.dset2;
        // }

        // if($scope.isEmpty($scope.dataset3)){
        //     console.log('Null');
        // }
        // else{
        //     $scope.dataset3=$scope.dset3;
        // }
    };

    $scope.dataset5=[];
    $scope.LocationCheck=function(){
        $scope.pageNum=1;
        $scope.dataset5=[];
        $scope.dataLocation=[];

        $scope.dataset5=locationService.query(
                            {
                                minLat:$scope.minLat,
                                minLon:$scope.minLon,
                                maxLat:$scope.maxLat,
                                maxLon:$scope.maxLon,
                                pageNum:$scope.pageNum
                            }).$promise.then(loc);
    };

    function loc(data) { 
        var m=data.results.length;
        for(var i=0; i < m; i++) {
            $scope.dataLocation.push(data.results[i]);
            console.log(data.results[i]);
        }

        if((data.count/100<=$scope.pageNum)){
            console.log('Reached null');
        }
        else{
            $scope.pageNum=$scope.pageNum+1;
            locationService.query(
                    {
                        minLat:$scope.minLat,
                        minLon:$scope.minLon,
                        maxLat:$scope.maxLat,
                        maxLon:$scope.maxLon,
                        pageNum:$scope.pageNum
                    }).$promise.then(loc);      
        }   
    }
    $scope.checkFilter=function(){
            $scope.selectedTagUrl='';

            for(var m=0 ;m<=$scope.selectedTag.length-2;m++){
                $scope.selectedTagUrl=$scope.selectedTagUrl+$scope.selectedTag[m].tag+',';
            }
            $scope.selectedTagUrl=$scope.selectedTagUrl+
            $scope.selectedTag[$scope.selectedTag.length-1].tag;
            console.log($scope.selectedTagUrl);
            
        for(var a in $scope.dataDuplicate){ 
        console.log($scope.dataDuplicate[a]);  
            if($scope.isEmpty($scope.dataDuplicate[a])){
                console.log('Null');
            }
            else{ 
                console.log("value of a "+a);
                var filterData1=tagFiltering.query({
                                selectedTag:$scope.selectedTagUrl,
                                dataId:a, matchModel:$scope.matchModel},
                                function(){
                                    $scope.dataDuplicate[a]=filterData1;
                                    console.log($scope.dataDuplicate[a]);
                                });
            }
        }
    };
    $scope.refresh=false;
    $scope.refreshMap=function(){
        console.log('refreshing the map');
        $scope.refresh=true;
    };
    $scope.fillcolor={
        color:'#63C3F2',
        opacity: '0.1'
    };
    $scope.strokecolor={
        weight: 1,
        color: '#505250',
        opacity: 0.4
    };
    $scope.user={
        dataset:['dara']
    };
    $scope.checkAll = function() {
    };
    $scope.uncheckAll = function() {
        $scope.selectedSource = [];
    };
    $scope.onSelect = function(dataSourceId) {
        console.log(dataSourceId);
        $scope.pageFeed=1;
        if($scope.selectedSource[dataSourceId]===undefined){
            $scope.selectedSourceDisabled[dataSourceId]=true;
            $scope.temp=dataFeed.query({
            'dataSourceId':dataSourceId,
            'pageFeed':$scope.pageFeed
            }).$promise.then(function(data){
            console.log('DataSourceId',dataSourceId);
            q(data,dataSourceId);
        });
        }   
        else if($scope.selectedSource[dataSourceId]===false){
        }
        else if($scope.selectedSource[dataSourceId]===true) {
            console.log('entered false statement');
            //delete $scope.data[dataSourceId];
        } 
        console.log('<<'+$scope.selectedSource[dataSourceId]+'>>');    
    };
    function q(data,dataSourceId) {
        var r=data.results.length; 
        //console.log('^'+dataSourceId+'^');
        if($scope.data[dataSourceId]!==undefined){
            var existingArray=[];
            existingArray = $scope.data[dataSourceId];
            for(var i=0;i<r;i++){
                existingArray.push(data.results[i]);
            }
            $scope.data[dataSourceId] = existingArray;
            $scope.dataDuplicate[dataSourceId]= $scope.data[dataSourceId];
        }
        else{
            if(dataSourceId!=undefined){
                $scope.data[dataSourceId] = data.results;
                $scope.dataDuplicate[dataSourceId]= $scope.data[dataSourceId];
            }   
        }
        console.log(Math.ceil(data.count/400));
        console.log("***"+($scope.pageFeed));
        if($scope.pageFeed==30 || $scope.pageFeed==60 || $scope.pageFeed==100 || $scope.pageFeed==143){
            
            $scope.dataShow=$scope.data;
        }
        // i can use some optimization by showing half points
        if(Math.ceil(data.count/100)<=$scope.pageFeed) {
            $scope.selectedSourceDisabled[dataSourceId]=false;
            console.log($scope.selectedSourceDisabled[dataSourceId]);
        }
        else{
            $scope.pageFeed=$scope.pageFeed+1;
            dataFeed.query({'dataSourceId':dataSourceId,
                            'pageFeed':$scope.pageFeed
            }).$promise.then(function(data){
                console.log('DataSourceIdInner',dataSourceId);
                q(data,dataSourceId);
                });
        }
    }
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
        $scope.map.zoom=13;
        $scope.maxLon=$scope.newMark.location.longitude+1.0;
        $scope.minLon=$scope.newMark.location.longitude-1.0;
        $scope.maxLat=$scope.newMark.location.latitude+1.0;
        $scope.minLat=$scope.newMark.location.latitude-1.0;
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
         $scope.polyData1=[];
        var maxLon=$scope.newMark.location.longitude+1.0;
        var minLon=$scope.newMark.location.longitude-1.0;
        var maxLat=$scope.newMark.location.latitude+1.0;
        var minLat=$scope.newMark.location.latitude-1.0;
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
        for(var i=0; i < m; i++) {
            $scope.polyData1.push(dataPoly.results[i]);
        }
        if((dataPoly.count/100)<=$scope.pagePolygon){
            console.log('reached null');
        }
        else{
            console.log('how many times');
            $scope.pagePolygon=$scope.pagePolygon+1;
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
