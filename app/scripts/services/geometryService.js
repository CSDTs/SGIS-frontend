'use strict';

angular.module('sgisServices')
  .service('sharedGeomService', ['getServices','envService','sharedTagService',function (getServices,envService,sharedTagService) {
    var sgs = this;
    sgs.points = {};
    sgs.datasetStatus = {};
    sgs.stop = false;
    /*{array-index:  {id: ,
                      lastPage: }}*/

    return {
      loadDataset: function(dataset){
        if (sgs.stop){return;}
        sgs.dataset = dataset.id;
        sgs.params = envService.getBoundingBox();
        sgs.params.tag = sharedTagService.getTagList();
        sgs.params.match = sharedTagService.getMatch();
        sgs.params.page = 1;

        sgs.geometries = getServices.mapElement.query(sgs.params,function() {
          var temp = sgs.geometries;
          sgs.geometries = sgs.geometries.results.features;
          var recursiveLoad = function(num){
            sgs.params.page = num;
            temp = getServices.mapElement.query(sgs.params,function(){
              sgs.geometries = sgs.geometries.concat(temp.results.features);
              if (temp.next != null){
                recursiveLoad(num+1);
              }
            });
          };
          if (temp.next!=null){
            recursiveLoad(2);
          }
        });
        return sgs.geometries;
      },
      getPoints:function () {
        return sgs.points;
      },
      setPoints:function(list){
        sgs.points = list;
      },
      getStop: function(){
        return stop;
      },
      stopLoading: function(){
        stop = true;
      },
      resumeLoading: function(){
        stop = false;
      }
  };
}]);
