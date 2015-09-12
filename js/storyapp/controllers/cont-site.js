storyApp.controller('Site', ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {

    var site = this;

    site.logIn = function() {
        console.log("I want to sign in!");
        AuthenticationService.Login("simon", "tum", function (response) {
            if (response.token) {
                AuthenticationService.StoreAuth("simon", response.token);
                console.log("Successfully logged in!!!!", response);
                //AuthenticationService.SetCredentials(vm.username, vm.password);
                //$location.path('/');
            } else {
                console.log("Failed to log in :(((", response);
            }
        });
    }

}]);

