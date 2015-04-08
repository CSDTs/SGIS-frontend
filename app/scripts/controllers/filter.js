'use strict';

/**
 * @ngdoc function
 * @name sgisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sgisApp
 */
angular.module('sgisApp')
  .controller('FilterController', ['$scope','sharedTagService',function ($scope,sharedTagService) {
    /*local scope accessible by anonymous functions*/
    var filterCtrl = this;
    /*function inside here is done when query returns*/
  	//filterCtrl.activeTags = sharedTagService.getTagListForInput();

    filterCtrl.tags = [];
    filterCtrl.getActiveTags = sharedTagService.getTagListForInput;

  	filterCtrl.runFilter = function(){
      
  	};


  }]);
