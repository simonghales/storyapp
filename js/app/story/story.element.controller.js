angular
    .module('app.story.controllers')
    .controller('StoryElementCTRL', StoryElementCTRL);

StoryElementCTRL.$inject = ['$scope', 'StoryResource'];

/* @ngInject */
function StoryElementCTRL($scope, StoryResource) {
    /* jshint validthis: true */
    var vm = this;

    vm.element = $scope.element;

    vm.activate = activate;
    vm.setStyles = setStyles;

    activate();

    ////////////////

    function activate() {
        //console.log("Scope for element", $scope);
    }

    function setStyles() {
        return {
            "color": vm.element.color,
            "font-size": vm.element.font_size,
            "text-align": vm.element.text_align,
        }
    }

}