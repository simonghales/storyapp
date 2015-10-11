angular
    .module('app.story.controllers')
    .controller('StoryCTRL', StoryCTRL);

StoryCTRL.$inject = ['$rootScope', '$stateParams', 'StoryResource', 'ModalsService'];

/* @ngInject */
function StoryCTRL($rootScope, $stateParams, StoryResource, ModalsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        deleted: false,
        loading: false,
        loaded: false,
        error: false,
        owner: false
    }

    vm.data = {
        story: null
    }

    vm.activate = activate;
    vm.getStory = getStory;
    vm.deleteStoryPrompt = deleteStoryPrompt;
    vm.removePage = removePage;

    activate();

    ////////////////

    function activate() {
        vm.getStory();
    }

    function getStory() {
        vm.states.loading = true;
        console.log("Get story", StoryResource);
        StoryResource.one($stateParams.id).get().then(function(data) {
            console.log("Loaded data", data);
            if(data.deleted) {
                vm.states.deleted = true;
                console.log("Story is deleted");
            } else {
                vm.data.story = StoryResource.prep(data);
                _prepStory();
            }
            vm.states.loaded = true;
            vm.states.loading = false;
        }, function(error) {
            console.log("Error", error);
            vm.states.loaded = true;
            vm.states.loading = false;
            vm.states.error = true;
        });
    }

    function deleteStoryPrompt() {
        freezeSite();
        data = vm.data.story;
        var modal = ModalsService.deleteStory(data);
    }

    function removePage(index) {
        vm.data.story.pages.splice(index, 1);
        console.log("I should remove page at index:", index);
    }

    // Private functions

    function _prepStory() {
        _checkOwner();
    }

    function _checkOwner() {
        if(!$rootScope.user) return;
        if(vm.data.story.author.id == $rootScope.user.id) {
            vm.states.owner = true;
        } else {
            vm.states.owner = false;
        }
    }


}