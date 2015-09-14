storyApp.controller('Site', ['$scope', '$rootScope', '$state', 'Author', 'AuthenticationService', function($scope, $rootScope, $state, Author, AuthenticationService) {

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



    site.editing = Author.getEditing();
    $rootScope.$on('author-editingChanged', function(event, value) {
        site.editing = value;
    });

    site.toggleEditing = function() {
        Author.toggleEditing();
    }

    site.saveEditing = function() {
        console.log("Saving changes!");
        //Author.toggleEditing();
        // do something with the data....
    }

}]);

