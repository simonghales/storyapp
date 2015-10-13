angular
    .module('app.account.controllers')
    .controller('SignInCTRL', SignInCTRL);

SignInCTRL.$inject = ['$rootScope', '$scope', 'AuthenticationResource', 'UserResource'];

/* @ngInject */
function SignInCTRL($rootScope, $scope, AuthenticationResource, UserResource) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        busy: false,
        error: false,
        success: false,
    }

    vm.input = {
        username: "",
        password: ""
    }

    vm.activate = activate;
    vm.changeModal = changeModal;
    vm.submit = submit;

    activate();

    ////////////////

    function activate() {
    }

    function changeModal() {
        $scope.closeThisDialog('signUp');
    }

    function submit(validForm) {
        console.log("Try to submit!");
        if(!validForm || vm.states.busy) return;
        vm.states.busy = true;
        vm.states.error = false;

        AuthenticationResource.post({
            username: vm.input.username,
            password: vm.input.password
        }).then(function(data) {
            console.log("Response", data);
            AuthenticationResource.setAuth(data.token, true);
            $rootScope.$broadcast('user-authenticated');
            _getCurrentUser();

        }, function(error) {
            console.log("Response", error);
            vm.states.busy = false;
            vm.states.error = true;
        });

    }

    // Private functions

    function _getCurrentUser() {

        UserResource.one('current').get()
            .then(function(data) {
                console.log("Got current user", data);
                UserResource.storeUser(data.plain());
                $rootScope.user = data.plain();
                $rootScope.$broadcast('user-signedIn');
                vm.states.busy = false;
                $scope.closeThisDialog();
            }, function(error) {
                console.log("Error getting current user", error);
                vm.states.busy = false;
                vm.states.error = true;
            });
    }

}