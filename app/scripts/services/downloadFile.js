'use strict';

angular.module('socialjusticeApp')
    .service('downloadFile', function($resource,config) {
     return $resource(config.route('downloadFile'), null,{
        query: {method: 'GET', isArray: false, transformResponse: function(pData) {
          var Data = JSON.parse(pData);
          return Data;
      }}
   });
   });
