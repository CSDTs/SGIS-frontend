'use strict';

angular.module('sgisServices')
  .service('getServices', ['$resource','config',function getServices($resource, config) {
    return {
        datasetList: $resource(config.route('datasetList'), {}, {query: {method: 'GET', isArray: false}}),
        mapElement: $resource(config.route('mapElement'), {}, {query: {method: 'GET', isArray: false}}),
    };
}]);