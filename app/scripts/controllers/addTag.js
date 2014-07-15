'use strict';

angular.module('socialjusticeApp')
.config(function($modalProvider) {
  angular.extend($modalProvider.defaults, {
    html: true
  });
})

.controller('addTagCtrl', function($scope, $modal) {
  // Show a basic modal from a controller
  //var myModal = $modal({title: 'My Title', content: 'My Content', show: true});

  // Pre-fetch an external template populated with a custom scope
  
  var myOtherModal  = $modal({scope: $scope, template: 'views/modal/tags.html', show: false});
  // Show when some event occurs (use $promise property to ensure the template has been loaded)
  $scope.showModal = function() {
    myOtherModal.$promise.then(myOtherModal.show);
  };
  $scope.hideModal = function() {
     myOtherModal.$promise.then(myOtherModal.hide);
   };

   //$scope.modal = {title: 'Title', content: 'Hello Modal<br />This is a multiline message!'};
});