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
      getFilterTagList:function () {
        return Object.keys(filterByList);
      },
      getTagListForInput:function(){
        var list = [];
        for (var tag in activeTagList){
          list.push({text:tag});
        }
        return list;
      },
      addTags:function(dataset){
        for (var i = 0; i < dataset.tags.length; i++ ){
          if(activeTagList.hasOwnProperty(dataset.tags[i])){
            activeTagList[dataset.tags[i]][dataset.id] = true;
          }else{
            activeTagList[dataset.tags[i]] = {};
            activeTagList[dataset.tags[i]][dataset.id] = true;
          }
        }
      },
      removeTags:function (dataset) {
        for (var i = 0; i < dataset.tags.length; i++ ){
          if(activeTagList.hasOwnProperty(dataset.tags[i]) && activeTagList[dataset.tags[i]].hasOwnProperty(dataset.id)){
            delete activeTagList[dataset.tags[i]][dataset.id];
          }
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
      addToFilterByList: function(list){
        filterByList = filterByList.concat(list);
      },
      setFilterByList: function(list){
        filterByList = list;
      },
      matchAll:function(){
        matchAll = true;
      },
      matchAny:function(){
        matchAll = false;
      },
      getMatch:function(){
        return matchAll ? 'all' : 'any';
      },
      setMatchAll: function(match){
        matchAll = match;
      },
      checkTagApproved: function(tag, datasetId){
        if (activeTagList.hasOwnProperty(tag) && activeTagList[tag].hasOwnProperty(datasetId)){
          return true;
        }
        return false;
      },
  };
});