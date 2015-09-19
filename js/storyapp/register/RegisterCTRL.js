angular
    .module('storyApp')
    .controller('RegisterCTRL', RegisterCTRL)

    .$inject = ['$scope', '$rootScope', 'AuthenticationService'];

/* @ngInject */
function RegisterCTRL($scope, $rootScope, AuthenticationService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.register = register;
    vm.cancel = cancel;
    vm.test = "boop";
    vm.states = {
        busy: false,
        error: false
    }

    vm.email = "";
    vm.username = "";
    vm.password = "";

    activate();

    ////////////////

    function activate() {
    }

    function register(formValid) {
        console.log("Trying to log in!", formValid);
        if(!formValid) {
            return;
        }
        if(vm.states.busy) {
            return;
        }
        vm.states.busy = true;
        vm.states.error = false;

        // TODO: Add error handling
        AuthenticationService.Register(vm.email, vm.username, vm.password)
            .then(function(data) {
                if(data.success == false) {
                    vm.states.error = true;
                    vm.states.busy = false;
                    console.log("Error: ", data);
                }
                else {

                    AuthenticationService.Login(vm.username, vm.password)
                        .then(function(data) {
                            if(data.success == false) {
                                vm.states.error = true;
                                vm.states.busy = false;
                                console.log("Error: ", data);
                            }
                            else {
                                AuthenticationService.StoreAuth(vm.username, data.data.token);
                                vm.states.busy = false;
                                $rootScope.$broadcast('user-loggedIn');
                                $scope.closeThisDialog();
                            }
                        }, function(error) {
                            vm.states.error = true;
                            vm.states.busy = false;
                            console.log("Error: " + error);
                        });

                }
            }, function(error) {
                vm.states.error = true;
                vm.states.busy = false;
                console.log("Error: " + error);
            });

    }

    function cancel() {
        console.log("Close the form!");
        $scope.closeThisDialog();
    }


}