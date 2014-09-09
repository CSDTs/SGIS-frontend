'use strict';

    angular.module('socialjusticeApp')
  .constant('baseUrlFilter','http://107.170.106.235/api-mp/?tag=:selectedTag&dataset=:dataId&match=matchModel')
    .service('tagFiltering', function($resource,baseUrlFilter) {
     return $resource(baseUrlFilter, {},{
        query: {method: 'GET', isArray: true, transformResponse: function(filterData) {
          var d = JSON.parse(filterData);
          console.log(d.results);
          return d.results;
      }}
   });
   });

