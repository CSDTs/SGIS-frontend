'use strict';

angular.module('sgisServices')
  .service('getServices', ['$resource','config',function getServices($resource, config) {
    return {
        datasetList: $resource(config.route('datasetList'), {}, {query: {method: 'GET', isArray: false}}),
        mapElement: $resource(config.route('mapElement'), {}, {query: {method: 'GET', isArray: true, params:{page_size:100}, transformResponse : function(data, headers) {
                var parsed = JSON.parse(data);
                return parsed.next ? parsed.results.features.concat([true]) : parsed.results.features.concat([false]);
              }}}),
    };
}]);