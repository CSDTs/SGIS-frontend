'use strict';

angular.module('socialjusticeApp')
  .service('dataEdit', function($resource) {
   return $resource('http://107.170.106.235/api-mp/:id/', null,
       {
           'update': { method:'PUT' }
       });
   });
