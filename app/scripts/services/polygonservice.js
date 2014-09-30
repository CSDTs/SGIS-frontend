'use strict';

angular.module('socialjusticeApp')
  .constant('baseUrl','http://107.170.106.235/api-poly/?max_lat=:minLat&min_lon=:minLon&min_lat=:minLat&max_lon=:minLon&page_size=100&page=:pageNum')
    .service('polygonService', function($resource,baseUrl) {
     return $resource(baseUrl, {},{
        query: {method: 'GET', isArray: true, transformResponse: function(polygonData) {
          var Data = JSON.parse(polygonData);
          // console.log(Data.results);
          return Data.results;
      }}
   });
   });
