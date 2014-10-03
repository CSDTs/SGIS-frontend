'use strict';

angular.module('socialjusticeApp')
  //.constant('baseUrlTag','http://107.170.106.235/api-ds'    )
  .service('tagService', function($resource,config) {
   return $resource(config.route('tagService'), null,{
      query: {method: 'GET', isArray: true, transformResponse: function(TagData) {
        var d = JSON.parse(TagData);
        var tagArray=d.results[0].tags;
        return tagArray;
    }}
   });
   });