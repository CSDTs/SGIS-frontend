'use strict';

  angular.module('socialjusticeApp')
    .service('tagFiltering', function($resource,config) {
     return $resource(config.route('tagFiltering'), null,{
        query: {method: 'GET', isArray: true, transformResponse: function(filterData) {
          var d = JSON.parse(filterData);
          console.log(d.results);
          return d.results;
      }}
   });
   });

