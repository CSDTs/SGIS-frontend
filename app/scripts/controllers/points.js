'use strict';

angular.module('sgisApp')
  .service('sharedPointService', function () {
    var points = {};

    return {
      getPoints:function () {
        return points;
      },
      setPoints:function(list){
        points = list;
      }
  };
})