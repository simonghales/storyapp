angular
    .module('app.story.controllers')
    .controller('StoryHomeCTRL', StoryHomeCTRL);

StoryHomeCTRL.$inject = ['StoryResource', 'Restangular'];

/* @ngInject */
function StoryHomeCTRL(StoryResource, Restangular) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        loading: false,
        loaded: false,
        error: false
    }

    vm.data = {
        stories: null
    }

    vm.activate = activate;
    vm.getStories = getStories;

    activate();

    ////////////////

    function activate() {
        vm.getStories();
    }

    function getStories() {
        vm.states.loading = true;
        StoryResource.getList({
            limit: 9
        }).then(function(data) {
            vm.data.stories = data;
            vm.states.loaded = true;
            vm.states.loading = false;
            console.log("Loaded data", data, vm.data.stories);
            for(var i = 0; i < vm.data.stories.length; i++) {
                console.log("Story", vm.data.stories[i]);
            }
        }, function(error) {
            console.log("Error", error);
            vm.states.loaded = true;
            vm.states.loading = false;
            vm.states.error = true;
        });
    }


}