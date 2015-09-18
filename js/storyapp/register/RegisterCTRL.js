angular
    .module('storyApp')
    .controller('RegisterCTRL', RegisterCTRL)

    .$inject = ['$scope', 'AuthenticationService'];

/* @ngInject */
function RegisterCTRL($scope, AuthenticationService) {
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

        // TODO: Register thingy here

    }

    function cancel() {
        console.log("Close the form!");
        $scope.closeThisDialog();
    }


}