'use strict';

angular.module('sgisServices')
  .service('sharedTagService', function () {
    var activeTagList = {};
    var filterByList = [];
    var matchAll = true;

    return {
      //active tag stuff
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
      },
      //filter by tag stuff
      getFilterByListForInput: function(){
        var list = [];
        for (var tag in filterByList){
          list.push({text:tag});
        }
        return list;
      },
      getFilterByList: function(){
        return filterByList;
      },
      setFilterByList: function(list){

      },
      matchAll:function(){
        matchAll = true;
      },
      matchAny:function(){
        matchAll = false;
      }
  };
})