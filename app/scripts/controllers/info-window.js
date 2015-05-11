angular.module('sgisApp')
  .controller('InfoWindowController', ['$scope','sharedTagService','getServices', function($scope, sharedTagService,getServices) {
    $scope.clickedPoint = {};
    $scope.clickedPoint.name = $scope.ngDialogData.feature.getProperty('name');
    //get and format address
    $scope.clickedPoint.address = $scope.ngDialogData.feature.getProperty('address');
    if ($scope.clickedPoint.address.street != null) {
      $scope.clickedPoint.address = [$scope.clickedPoint.address.street, $scope.clickedPoint.address.city + ', ' + $scope.clickedPoint.address.state + ' ' + $scope.clickedPoint.address.zipcode, $scope.clickedPoint.address.county + ' County'];
    } else {
      var temp = $scope.clickedPoint.address;
      $scope.clickedPoint.address = [];
      for (var key in temp){
        $scope.clickedPoint.address.push(temp[key]);
      }
    }

    //set tags
    $scope.availableTags = sharedTagService.getTagListForInput();
    $scope.tags = [];
    var origTags = $scope.ngDialogData.feature.getProperty('tags');
    for (var tag in origTags){
      $scope.tags.push({text:origTags[tag]});
    }
    //get data points
    $scope.dataList = getServices.mapElementData.query({data: 'all', id: $scope.ngDialogData.feature.getId()}, function(){});

    var checkNewTag = function(tag){
      for (var t in origTags){
        if (tag == origTags[t]){
          return false;
        }
      }
      return true;
    };
    $scope.pushTags = function(){
      var approved = true;
      for (var tag in $scope.tags){
        if(checkNewTag($scope.tags[tag])){
          getServices.tag.save({mapelement:$scope.ngDialogData.feature.getId(),tag:$scope.tags[tag]}, function(){
              //add returned info to origTags because it's now pushed (non-approved tags not shown)

              if(true)
                approved = false;
          });
        }
      }
      //show non-approved warning
      //change this to show only if non-approved tags are pushed
      if (!approved){        
        ngDialog.open({
          template: '<p>If a tag you added has not yet been approved, a teacher needs to approve it. Until then, your tag will not appear, but it has been saved.</p>'
        });
      }
    };
  }
]);