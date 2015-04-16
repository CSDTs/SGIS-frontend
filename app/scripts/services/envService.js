'use strict';

angular.module('sgisServices')
  .service('envService', ['getServices','sharedTagService',function (getServices,sharedTagService) {
      return {
        init: function(){
          this.boundingBox = {};
          this.activeDatasets = {}; 
          this.points = [];
          this.points = {};
          this.datasetStatus = {};
          this.stop = false;
        },
        getBoundingBox:function(){
          return this.boundingBox;
        },
        getActiveDatasets:function(){
          return this.activeDatasets;
        },
        getFilterTags:function(){
          return this.filterTags;
        },
        setBoundingBox:function(input){
          this.boundingBox = input;
        },
        setActiveDatasets:function(input){
          this.activeDatasets = input;
        },
        addActiveDataset:function(id){
          this.activeDatasets[id] = true;
        },
        removeActiveDataset:function(id){
          delete this.activeDatasets[id];
        },
        getPoints:function(){
          return this.points;
        },
        addPoints:function(list){
          this.points.concat(list);
          console.log(this.points);
        },
        loadDataset: function(dataset){
          if (this.stop){return;}
          this.dataset = dataset.id;
          this.params = this.getBoundingBox();
          this.params.tag = sharedTagService.getTagList();
          this.params.match = sharedTagService.getMatch();
          this.params.page = 1;
  
          this.points = getServices.mapElement.query(this.params,function() {
            var temp = this.points;
            this.points = this.points.results.features;
            var recursiveLoad = function(num){
              this.params.page = num;
              temp = getServices.mapElement.query(this.params,function(){
                this.points = this.points.concat(temp.results.features);
                if (temp.next != null && !this.stop){
                  recursiveLoad(num+1);
                }
              });
            };
            if (temp.next!=null && !this.stop){
              recursiveLoad(2);
            }
          });
        },
        applyMap:function(){
      /*    $scope.map = {
        events: {
              tilesloaded: function (map) {
                  $scope.$apply(function () {
                      $scope.mapInstance = map;
                  });
              }
          }
      }*/
        }
      };
      }]);