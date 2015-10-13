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
                owner: "=",
                editing: "=",
                config: "=",
            }
        }

        directive.link = function(scope, element, attributes) {

            element.css({
                "top": scope.pageVertical,
                "bottom": scope.pageVertical,
                "left": scope.pageHorizontal,
                "right": scope.pageHorizontal,
            });

            if(scope.owner) {
                element.resizable(scope.config);

                if(!scope.editing) {
                    console.log("Disable boop woop!");
                    element.resizable("disable");
                }

                scope.$watch('editing', function (enabled, oldValue) {
                    if(enabled) {
                        element.resizable("enable");
                    } else {
                        element.resizable("disable");
                    }
                }, true);

            }

        }

        return directive;

    }

})();