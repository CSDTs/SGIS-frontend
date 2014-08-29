'use strict';

angular.module('socialjusticeApp')
  .factory('dataEdit', function($resource,djResource) {
   return djResource('http://107.170.106.235/api-tag/', {},
       {
           'create': { method:'POST' }
       });
   });
