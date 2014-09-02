'use strict';

angular.module('socialjusticeApp')
  .constant('baseUrlTag','http://107.170.106.235/api-mp?dataset=11&tag=fruits')
    .service('tagFiltering', function($resource,baseUrlTag) {
      return $resource(config.route('dataFeed'), null, {
        query: {
          method: 'GET', 
          isArray: true, 
          transformResponse: function(data) {
              data = JSON.parse(data);
              return data.results;
          }
        }
    });
   });
