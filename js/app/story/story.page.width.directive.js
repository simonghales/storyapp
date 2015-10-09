/**
 * storyPage
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('pageWidth', pageWidth);

    /**
     * @namespace External
     */
    function pageWidth() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.pageWidth
         */
        var directive = {
            restrict: 'A',
            scope: {
                pageWidth: "="
            }
        }

        directive.link = function(scope, element, attributes) {

            element.css({
                "max-width": scope.pageWidth
            });

        }

        return directive;

    }

})();