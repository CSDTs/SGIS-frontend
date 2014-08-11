'use strict';

angular.module('socialjusticeApp')
  .factory('dataEdit', function($resource) {
   return $resource('http://107.170.106.235/api-mp/:id/', {},
       {
           'update': { method:'PUT' }
       });
   });
