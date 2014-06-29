'use strict';

angular.module('socialjusticeApp')
  .service('dataFeed', function dataFeed($resource, config) {
      return $resource(config.route('dataFeed'));
  });
