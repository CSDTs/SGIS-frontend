'use strict';

angular.module('socialjusticeApp')
.controller('addTagCtrl',function($scope, $modal,dataEdit,djResource) {
	// Pre-fetch an external template populated with a custom scope
	var myOtherModal  = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
	// Show when some event occurs (use $promise property to ensure the template has been loaded)
	$scope.showModal = function() {
		myOtherModal.$promise.then(myOtherModal.show);
	};
	$scope.hideModal = function() {
		myOtherModal.$promise.then(myOtherModal.hide);
	};
	
});

