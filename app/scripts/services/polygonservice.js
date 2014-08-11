'use strict';

angular.module('socialjusticeApp')
  .constant("baseUrl","http://107.170.106.235/api-poly/?page_size=10000")
  .service('polygonService', function($resource,baseUrl) {
   return $resource(baseUrl, {},{
      query: {method: 'GET', isArray: true, transformResponse: function(polygonData) {
        var Data = JSON.parse(polygonData);
        return Data.results;
    }}
   });
   });
