(function() {

    angular
        .module('app.story.controllers')
        .controller('DeleteStoryPageCTRL', DeleteStoryPageCTRL);

    DeleteStoryPageCTRL.$inject = ['$rootScope', '$scope', '$location', 'PageResource'];

    /* @ngInject */
    function DeleteStoryPageCTRL($rootScope, $scope, $location, PageResource) {
        /* jshint validthis: true */
        var vm = this;

        vm.states = {
            busy: false,
            error: false,
            success: false,
        }

        vm.page = $scope.ngDialogData;

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

            PageResource.one(vm.page.id).remove()
                .then(function() {
                    vm.states.busy = false;
                    $scope.closeThisDialog("deleted");
                }, function(error) {
                    console.log("Error", error);
                    vm.states.error = true;
                    vm.states.busy = false;
                });
        }

    }

})();