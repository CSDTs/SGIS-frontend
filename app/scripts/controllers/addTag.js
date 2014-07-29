'use strict';

angular.module('socialjusticeApp')
.config(function($modalProvider) {
  angular.extend($modalProvider.defaults, {
    animation: 'am-flip-x'
  });
})
.controller('addTagCtrl', function($scope, $modal) {
	// Pre-fetch an external template populated with a custom scope
	var myOtherModal  = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
	// Show when some event occurs (use $promise property to ensure the template has been loaded)
	$scope.showModal = function() {
		myOtherModal.$promise.then(myOtherModal.show);
	};
	$scope.hideModal = function() {
		myOtherModal.$promise.then(myOtherModal.hide);
	};
	$scope.multiTags= [
	    { firstName: 'sells vegetables',    lastName: 'Parker',     pic: '<img src=\'[...]/peter.png  class=\'multiSelect\'  />',   selected: false },
	    { firstName: 'fruits',     lastName: 'Jane',       pic: '<img src=\'[...]/mary.png   class=\'multiSelect\'  />',   selected: false },
	    { firstName: 'stationary',    lastName: 'Wayne',      pic: '<img src=\'[...]/bruce.png  class=\'multiSelect\'  />',   selected: false  },
	    { firstName: 'laundry',    lastName: 'Banner',     pic: '<img src=\'[...]/david.png  class=\'multiSelect\'  />',   selected: false },
	    { firstName: 'fastfood',  lastName: 'Romanova',   pic: '<img src=\'[...]/natalia.png class=\'multiSelect\' />',   selected: false },
	    { firstName: 'pizza',    lastName: 'Kent',       pic: '<img src=\'[...]/clark.png  class=\'multiSelect\'  />',   selected: false  }
	];
});

