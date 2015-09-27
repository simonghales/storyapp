angular
    .module('storyApp')
    .controller('SettingsCTRL', SettingsCTRL)

.$inject = ['$scope', '$location', 'StoryService'];

/* @ngInject */
function SettingsCTRL($scope, $location, StoryService) {
    /* jshint validthis: true */
    var vm = this;

    vm.id;
    vm.states = {
        busy: false,
        error: false
    }

    vm.activate = activate;
    vm.deleteStory = deleteStory;

    activate();

    ////////////////

    function activate() {
        vm.id = $scope.ngDialogData.id;
    }

    function deleteStory() {
        if(vm.states.busy) {
            return;
        }
        vm.states.busy = true;
        console.log("Delete", vm.id);
        StoryService.DeleteStory(vm.id)
            .then(function(data) {
                if(data.success == false) {
                    console.log("Failed to delete story");
                    vm.states.error = true;
                } else {
                    $location.path('/');
                    $scope.closeThisDialog();
                }
                vm.states.busy = false;
            }, function(error) {
                console.log("Error: " + error);
                vm.states.error = true;
                vm.states.busy = false;
            })

    }
    
}