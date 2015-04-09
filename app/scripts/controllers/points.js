'use strict';

angular.module('sgisServices')
  .service('sharedPointService', function () {
    var points = {};
    var datasetStatus = {};
    /*{array-index:  {id: ,
                      lastPage: }}*/
    
    return {
      getPoints:function () {
        return points;
      },
      setPoints:function(list){
        points = list;
      }
  };
})