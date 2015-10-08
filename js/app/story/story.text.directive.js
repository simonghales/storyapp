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
            //scope: {
            //    playlist: "="
            //}
        }

        directive.link = function(scope, element, attributes) {

            element.addClass("posHorizontal__" + attributes.horizontal);
            element.addClass("posVertical__" + attributes.vertical);

        }

        return directive;

    }

})();