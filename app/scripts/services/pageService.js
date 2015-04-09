'use strict';

angular.module('sgisServices')
  .service('pageService',['datasetList',function(datasetList){
      var services = {};
      var datasets = {};
      var halt = false;
      var recursiveLoad = function(svc,params,checkHalt,addActive,num){
        params.page = num;
        var results = svc.query({page:num},function(){
          for (var i = 0; addActive && i < results.results.length;i++){
            results.results[i]['active'] = false;
          }
          if (results.next != null && (!checkHalt || !halt)){
            results = results.results;
            return results.concat(recursiveLoad(svc,params,checkHalt,addActive,num+1));
          } else {
            if (results.next != null){
              /*must have been halted*/

            }else{
              
            }
            return results.results;
          }
        });
      };
      var getLoop = function(svc,params,checkHalt,addActive){
        var results = svc.query(params,function() {
          var temp = results;
          results = results.results;
          for (var i = 0; addActive && i < results.length;i++){
            results[i]['active'] = false;
          }
          if (temp.next!=null && (!checkHalt || !halt)){
            recursiveLoad(2);
          }
      };

      return {
        getDatasets:function(){
          return function(){};
        },
        getPoints:function(){

        }
      };
  }]);


var datasetListCtrl = this;
    /*function inside here is done when query returns*/
  	datasetListCtrl.datasets = 