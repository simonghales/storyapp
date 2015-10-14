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
    vm.editElement = editElement;
    vm.setStyles = setStyles;

    activate();

    ////////////////

    function activate() {
        //console.log("Scope for element", $scope);
    }

    function editElement($event) {
        var offset = {
            x : $event.pageX,
            y : $event.pageY
        }
        $scope.editElement(vm.element, $scope.pending, offset);
    }

    function setStyles() {
        return {
            "color": vm.element.color,
            "font-size": vm.element.font_size,
            "text-align": vm.element.text_align,
        }
    }

}