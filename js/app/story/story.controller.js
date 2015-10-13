angular
    .module('app.story.controllers')
    .controller('StoryCTRL', StoryCTRL);

StoryCTRL.$inject = ['$rootScope', '$stateParams', 'StoryResource', 'PageResource', 'ModalsService'];

/* @ngInject */
function StoryCTRL($rootScope, $stateParams, StoryResource, PageResource, ModalsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        deleted: false,
        loading: false,
        loaded: false,
        error: false,
        owner: false,
        editing: false,
    }

    vm.data = {
        story: null
    }

    vm.activate = activate;
    vm.getStory = getStory;
    vm.addPage = addPage;
    vm.deleteStoryPrompt = deleteStoryPrompt;
    vm.removePage = removePage;
    vm.toggleEditing = toggleEditing;

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

    function addPage(index) {
        var page = PageResource.newPageTemplate($stateParams.id);
        page = StoryResource.prepPage(page);
        if(vm.data.story.pages[index + 1] && vm.data.story.pages[index + 1].id) {
            page.insert_before = vm.data.story.pages[index + 1].id;
        }
        vm.data.story.pages.splice(index + 1, 0, page);
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

    function toggleEditing() {
        vm.states.editing = !vm.states.editing;
    }

    // Private functions

    function _prepStory() {
        _checkOwner();
    }

    function _checkOwner() {
        if(!$rootScope.user) return;
        if(vm.data.story.author.id == $rootScope.user.id) {
            vm.states.owner = true;
            vm.states.editing = true;
        } else {
            vm.states.owner = false;
            vm.states.editing = false;
        }
    }


}