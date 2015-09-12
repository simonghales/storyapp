storyApp.controller('Confirmation', ['$scope', function($scope) {

    console.log("Init confirmation controller!");

    var confirmation = this;

    confirmation.confirm = function() {
        console.log("Confirmed!");
        $scope.closeThisDialog(true);
    }

    confirmation.cancel = function() {
        $scope.closeThisDialog();
    }

}]);

// $scope.closeThisDialog(timezone);