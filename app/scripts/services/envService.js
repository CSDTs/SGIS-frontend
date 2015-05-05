'use strict';

angular.module('sgisServices')
  .service('envService', ['getServices','sharedTagService',function (getServices,sharedTagService) {
      var boundingBox;
      var activeDatasets; 
      var datasetStatus;
      var stop;
      return {
        init: function(){
          boundingBox = {};
          activeDatasets = {}; 
          datasetStatus = {};
          stop = false;
        },
        getBoundingBox:function(){
          return boundingBox;
        },
        getActiveDatasets:function(){
          return activeDatasets;
        },
        getFilterTags:function(){
          return filterTags;
        },
        setBoundingBox:function(input){
          boundingBox = input;
        },
        setActiveDatasets:function(input){
          activeDatasets = input;
        },
        addActiveDataset:function(id){
          activeDatasets[id] = true;
        },
        removeActiveDataset:function(id){
          delete activeDatasets[id];
        },
      };
      }]);