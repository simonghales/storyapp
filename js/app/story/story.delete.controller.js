(function() {

    angular
        .module('app.story.controllers')
        .controller('DeleteStoryCTRL', DeleteStoryCTRL);

    DeleteStoryCTRL.$inject = ['$rootScope', '$scope', '$location', 'StoryResource'];

    /* @ngInject */
    function DeleteStoryCTRL($rootScope, $scope, $location, StoryResource) {
        /* jshint validthis: true */
        var vm = this;

        vm.states = {
            busy: false,
            error: false,
            success: false,
        }

        vm.story = $scope.ngDialogData;
        console.log("Data", vm.story);

        vm.activate = activate;
        vm.confirm = confirm;

        activate();

        ////////////////

        function activate() {
        }

        function confirm() {
            if(vm.states.busy) return;
            vm.states.busy = true;
            vm.states.error = false;
            vm.story.remove()
                .then(function() {
                    vm.states.busy = false;
                    $location.path('/');
                    $scope.closeThisDialog();
                }, function(error) {
                    console.log("Error", error);
                    vm.states.error = true;
                    vm.states.busy = false;
                });
        }

    }

})();