angular
    .module('app.story.controllers')
    .controller('StoryCTRL', StoryCTRL);

StoryCTRL.$inject = ['$rootScope', '$stateParams', 'StoryResource'];

/* @ngInject */
function StoryCTRL($rootScope, $stateParams, StoryResource) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
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

    activate();

    ////////////////

    function activate() {
        vm.getStory();
    }

    function getStory() {
        vm.states.loading = true;
        console.log("Get story", StoryResource);
        StoryResource.one($stateParams.id).get().then(function(data) {
            vm.data.story = StoryResource.prep(data);
            _prepStory();
            vm.states.loaded = true;
            vm.states.loading = false;
            console.log("Loaded data", data);
        }, function(error) {
            console.log("Error", error);
            vm.states.loaded = true;
            vm.states.loading = false;
            vm.states.error = true;
        });
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