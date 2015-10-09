/**
 * storyPage
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('pageOffsets', pageOffsets);

    /**
     * @namespace pageOffsets
     */
    function pageOffsets() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.pageOffsets
         */
        var directive = {
            restrict: 'A',
            scope: {
                pageVertical: "=",
                pageHorizontal: "=",
            }
        }

        directive.link = function(scope, element, attributes) {

            element.css({
                "top": scope.pageVertical,
                "bottom": scope.pageVertical,
                "left": scope.pageHorizontal,
                "right": scope.pageHorizontal,
            });

        }

        return directive;

    }

})();