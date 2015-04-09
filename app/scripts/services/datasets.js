'use strict';

angular.module('sgisServices')
  .service('datasetList', ['$resource','config',function datasetList($resource, config) {
    return $resource(config.route('datasetList'), {}, {query: {method: 'GET', isArray: false}});
}]);
/*"api-sensors": "http://127.0.0.1:8000/api-sensors/", 
    "api-count": "http://127.0.0.1:8000/api-count/", 
    "api-ds": "http://127.0.0.1:8000/api-ds/", 
    "api-mp": "http://127.0.0.1:8000/api-mp/", 
    "api-newtag": "http://127.0.0.1:8000/api-tag/", 
    "api-poly": "http://127.0.0.1:8000/api-poly/", 
    "api-tag": "http://127.0.0.1:8000/api-tag/", 
    "api-test": "http://127.0.0.1:8000/api-dist/", 
    "api-dist"*/