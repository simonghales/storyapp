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
                pageWidth: "=",
                owner: "=",
                editing: "=",
                config: "=",
            }
        }

        directive.link = function(scope, element, attributes) {

            element.css({
                "max-width": scope.pageWidth
            });

            if(scope.owner) {
                element.resizable(scope.config);

                if(!scope.editing) {
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