'use strict';

angular.module('sgisServices')
  .service('getServices', ['$resource','config',function getServices($resource, config) {
    return {
        datasetList: $resource(config.route('datasetList'), {}, {query: {method: 'GET', isArray: false}}),
        mapElement: $resource(config.route('mapElement'), {}, {query: {method: 'GET', isArray: false, params:{page_size:100}, transformResponse : function(data, headers) {
                return JSON.parse(data);
              }}}),
        mapElementData: $resource(config.route('mapElement')+':id/', {}, {query: {method: 'GET', isArray: false, params:{page_size:100}, transformResponse : function(data, headers) {
                return JSON.parse(data).properties.data;
              }}}),
    };
}]);