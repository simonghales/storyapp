angular.module('storyApp').controller('Site', ['$scope', '$rootScope', '$state',
    'Author', 'AuthenticationService', 'ngDialog', 'AuthenticationService', 'UserService',
    function($scope, $rootScope, $state, Author, AuthenticationService, ngDialog, AuthenticationService, UserService) {

    var site = this;
    site.states = {
      loggedIn : $rootScope.states.loggedIn
    };

    $rootScope.$on('user-loggedIn', function() {
        site.states.loggedIn = true;
        site.getCurrentUser();
    });

    $rootScope.$on('user-signedOut', function() {
        console.log("User signed out!");
        site.states.loggedIn = false;
    });

    $rootScope.$on('user-prompt-login', function() {
        site.openSignIn();
    });

    site.signOut = function() {

        AuthenticationService.ClearCredentials();
        $rootScope.$broadcast("user-signedOut");

    }

    site.getCurrentUser = function() {
        if(!$rootScope.states.loggedIn) {
            return;
        }
        UserService.GetCurrentUser()
            .then(function(data) {
                if(data.success == false) {
                    console.log("Error with loading current user :(");
                }
                UserService.StoreCurrentUser(data.data);
                console.log("Loaded current user", data);
            }, function(error) {
                console.log("Error: " + error);
            });
    }
    site.getCurrentUser();

    site.editing = Author.getEditing();
    $rootScope.$on('author-editingChanged', function(event, value) {
        site.editing = value;
    });

    site.toggleEditing = function(statusBool) {
        if(statusBool) Author.toggleEditing(statusBool);
        else Author.toggleEditing();
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

