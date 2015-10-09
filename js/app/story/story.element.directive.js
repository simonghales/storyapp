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
            //scope: {
            //    playlist: "="
            //}
        }

        return directive;

    }

})();