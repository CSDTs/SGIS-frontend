'use strict';

angular.module('socialjusticeApp')
  .service('dataSource', function dataSource($resource, config) {
    return $resource(config.route('dataSource'));
  });
