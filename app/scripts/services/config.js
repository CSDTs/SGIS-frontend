'use strict';

angular.module('sgisServices')
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
        /*put google maps API key here*/
        key: 'AIzaSyDazxNgLILi-BIkhWUqgodvdQgdcWu29_g',
        v: '3.17',
        libraries: ''
    });
  }])

  .service('config', function config() {
    var makeConfig = function() {
      var config = {
        map: {
          maxZoomLevelLoading: 8,
          starting: {
            zoom: 12,
            center: {latitude: 42.68,
                     longitude: -73.70}
          }
        },
        serverRoot: 'http://127.0.0.1:8000',
        routes: {
          datasetList: '/api-ds/',
          mapElement: '/api-test/',
          mapPoint: '/api-mp/',
          mapPolygon: '/api-poly/',

        },
        route: function(name) {
          var route = this.routes[name];
          /*if(values !== undefined) {
            for(var key in values) {
              route = route.replace(':'+key, values[key]);
            }
          }*/
          if(this.serverRoot !== undefined) {
            return this.serverRoot + route;
          }
          return 'http://127.0.0.1:8000' + route;
        },
        makeConfig: makeConfig
      };
      // If there is a global configuration available, merge it an overwrite defaults
      if(window.config !== undefined) {
        var merge = function(cur, old) {
          var res = old;
          for(var v in cur) {
            if(typeof cur[v] === 'object') {
              res[v] = merge(cur[v], old[v]);
            } 
            else {
              res[v] = cur[v];
            }
          }
          return res;
        };
        config = merge(window.config, config);
      }
      return config;
    };
    return makeConfig();
  });