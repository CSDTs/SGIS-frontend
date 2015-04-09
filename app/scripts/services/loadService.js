'use strict';

angular.module('sgisServices')
  .service('loadService', function () {
  	var stop = false;

  	return {
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
  })
  .service('pointService',function(){
  	

  });