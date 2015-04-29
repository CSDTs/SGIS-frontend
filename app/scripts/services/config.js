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
        //marker icon
        svg: {
          path: 'M 9.81,29.50 C 9.45,29.44 9.22,29.41 9.22,29.14 9.17,28.95 9.17,28.95 8.77,27.36 8.77,27.36 8.14,25.24 7.27,23.18 6.16,21.26 6.16,21.26 4.66,18.82 4.66,18.82 3.64,17.28 2.58,15.76 1.67,14.15 1.06,13.07 0.59,12.30 0.28,11.07 0.04,10.12 0.05,9.60 0.05,8.64 0.05,7.80 0.36,6.48 0.70,5.71 1.05,4.91 1.45,4.21 2.01,3.53 2.73,2.65 3.57,1.93 4.55,1.34 5.48,0.79 6.74,0.35 7.81,0.17 7.81,0.17 8.63,0.06 8.63,0.06 8.63,0.06 9.86,0.06 9.86,0.06 10.49,0.05 11.23,0.18 11.85,0.33 15.10,1.12 17.69,3.45 18.61,6.61 18.76,7.12 18.94,8.02 18.95,8.54 18.96,9.66 18.94,10.33 18.62,11.42 18.34,12.37 17.84,13.23 17.38,14.10 16.63,15.51 15.72,16.81 14.83,18.13 14.09,19.22 13.37,20.35 12.73,21.50 11.71,23.34 10.73,25.53 10.21,27.56 10.21,27.56 9.86,29.00 9.86,29.00 9.80,29.26 9.81,29.50 Z',
          anchor: {x:9.81,y:29.50},
          fillOpacity: 1,
          scale: 1.2,
          strokeColor: 'black',
          strokeWeight: 3
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