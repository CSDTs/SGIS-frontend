'use strict';

angular.module('sgisApp')
  .service('sharedTagService', function () {
    var activeTagList = {};

    return {
      getTagList:function () {
        return Object.keys(activeTagList);
      },
      getTagListForInput:function(){
        var list = [];
        for (var tag in activeTagList){
          list.push({text:tag});
        }
        return list;
      },
      addTag:function (tag) {
        if (activeTagList.hasOwnProperty(tag)){
            activeTagList[tag]++;
          } else{
            activeTagList[tag] = 1;
          }
      },
      removeTag:function (tag) {
        datasetListCtrl.activeTags[tag]--;
        if (datasetListCtrl.activeTags[tag] == 0){
          delete datasetListCtrl.activeTags[tag];
        }
      }
  };
})