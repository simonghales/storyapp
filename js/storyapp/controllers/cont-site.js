angular.module('storyApp').controller('Site', ['$scope', '$rootScope', '$state',
    'Author', 'AuthenticationService', 'ngDialog', 'AuthenticationService',
    function($scope, $rootScope, $state, Author, AuthenticationService, ngDialog, AuthenticationService) {

    var site = this;
    site.states = {
      loggedIn : $rootScope.states.loggedIn
    };

    $rootScope.$on('user-loggedIn', function() {
        site.states.loggedIn = true;
    });

    $rootScope.$on('user-signedOut', function() {
        console.log("User signed out!");
        site.states.loggedIn = false;
    });

    $rootScope.$on('user-prompt-login', function() {
        site.openSignIn();
    });

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

    site.signOut = function() {

        AuthenticationService.ClearCredentials();
        $rootScope.$broadcast("user-signedOut");

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

    site.openSignIn = function() {
        console.log("Open signin!");

        freezeSite();
        ngDialog.open({
            template: 'js/storyapp/signin/_signinModal.html',
            className: 'yepDialog-theme-default',
            controller: 'SigninCTRL',
            controllerAs: 'signin',
            preCloseCallback: function() {
                unfreezeSite();
            }
        });

    }

    site.openRegister = function() {
        console.log("Open register!");

        freezeSite();
        ngDialog.open({
            template: 'js/storyapp/register/_registerModal.html',
            className: 'yepDialog-theme-default',
            controller: 'RegisterCTRL',
            controllerAs: 'register',
            preCloseCallback: function() {
                unfreezeSite();
            }
        });

    }

}]);

