'use strict';

angular.module('socialjusticeApp')
  .service('config', function config() {
      var makeConfig = function() {
          return {
              routes: {
                  dataSource: '/fake_data/dataSource/:id.json',
                  dataFeed: '/fake_data/dataFeed.json?dataSource=:dataSourceId'
              },
              route: function(name, values) {
                  var route = this.routes[name];
                  if(values !== undefined) {
                    for(var key in values) {
                      route = route.replace(':'+key, values[key]);
                    }
                  }
                  if(this.serverRoot !== undefined) {
                    return this.serverRoot + route;
                  }
                  return route;
              },
              makeConfig: makeConfig
          };
      };

      return makeConfig();
  });
