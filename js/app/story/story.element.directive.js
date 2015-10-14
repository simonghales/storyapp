/**
 * storyPage
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('storyElement', storyElement);

    /**
     * @namespace storyElement
     */
    function storyElement() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.storyElement
         */
        var directive = {
            restrict: 'E',
            controller: 'StoryElementCTRL',
            controllerAs: 'elementVM',
            templateUrl: 'partials/story/_storyElement.html',
            replace: true,
            scope: {
                pending: "=",
                element: "=",
                editElement: "="
                //editing: "=",
            }
        }

        directive.link = function(scope, element, attributes) {


            scope.$watch('element.text', function (text, oldValue) {
                if(text !== oldValue) {
                    //console.log("Text changed", text, oldValue);
                    //scope.element.text = text.substring(0, 200);
                    scope.pending();
                }
            }, true);

        }

        return directive;

    }

})();