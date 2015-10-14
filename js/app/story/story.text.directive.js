/**
 * storyPage
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('storyText', storyText);

    /**
     * @namespace External
     */
    function storyText() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.storyText
         */
        var directive = {
            restrict: 'E',
            //controller: 'ArtistExternalCTRL',
            //controllerAs: 'externalModel',
            templateUrl: 'partials/story/_storyText.html',
            replace: true,
            scope: {
                horizontal: "=",
                vertical: "=",
                elements: "=",
                measurements: "=",
                config: "=",
                owner: "=",
                editing: "=",
                pending: "=",
                editElement: "="
            }
        }

        directive.link = function(scope, element, attributes) {

            _calculatePosition();

            element.css({
                width: scope.measurements.text_width,
                height: scope.measurements.text_height
            });

            scope.moveText = function(direction, type) {
                console.log("Move text");
                if(type == 'v') {
                    scope.vertical = direction;
                } else {
                    scope.horizontal = direction;
                }
                _calculatePosition();
                scope.pending();
            }

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

            // Private function

            function _calculatePosition() {
                console.log("Calculate positions");
                element.removeClass("posHorizontal__left " +
                    "posHorizontal__right " +
                    "posVertical__top " +
                    "posVertical__bottom")
                    .addClass("posHorizontal__" + scope.horizontal)
                    .addClass("posVertical__" + scope.vertical);
            }

        }

        return directive;

    }

})();