angular
    .module('app.story.controllers')
    .controller('StoryPageCTRL', StoryPageCTRL);

StoryPageCTRL.$inject = ['$scope', 'StoryResource'];

/* @ngInject */
function StoryPageCTRL($scope, StoryResource) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.page = $scope.page;

    activate();

    ////////////////

    function activate() {
        //console.log("Page's scope", vm.page);

        //console.log("Stringified", StoryResource.stringifyElements(vm.page.elements_prepped));
    }

}