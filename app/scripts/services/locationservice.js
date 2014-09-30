'use strict';

    angular.module('socialjusticeApp')
  .constant('baseUrlLocation','http://107.170.106.235/api-mp/?max_lat=:maxLat&min_lon=:minLon&min_lat=:minLat&max_lon=:maxLon&page_size=100&page=:pageNum')
    .service('locationService', function($resource,baseUrlLocation) {
     return $resource(baseUrlLocation, {},{
        query: {method: 'GET', isArray: false, transformResponse: function(filterData) {
          var d = JSON.parse(filterData);
          var nextResult=d.next;
          console.log(nextResult);
          console.log(d.results);
          return d;
      }}
   });
   });

