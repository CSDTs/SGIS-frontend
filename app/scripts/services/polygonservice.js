'use strict';

angular.module('socialjusticeApp')
  //.constant('baseUrlPoly','http://107.170.106.235/api-poly/?max_lat=:maxLat&min_lon=:minLon&min_lat=:minLat&max_lon=:maxLon&page_size=100&page=:pagePoly')
    .service('polygonService', function($resource,config) {
     return $resource(config.route('polygonService'), null,{
        query: {method: 'GET', isArray: false, transformResponse: function(pData) {
          var Data = JSON.parse(pData);
          return Data;
      }}
   });
   });
