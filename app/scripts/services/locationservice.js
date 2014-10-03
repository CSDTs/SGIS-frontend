'use strict';

angular.module('socialjusticeApp')
    .service('locationService', function($resource, config) {
     return $resource(config.route('locationService'), null,{
        query: {method: 'GET', isArray: false, transformResponse: function(filterData) {
          var d = JSON.parse(filterData);
          return d;
      }}
   });
   });

