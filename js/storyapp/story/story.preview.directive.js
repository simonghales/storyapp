/**
 * storyPreview
 * @namespace storyApp.story.directives
 */
(function () {
    'use strict';

    angular
        .module('storyApp.story.directives')
        .directive('storyPreviewCard', storyPreviewCard);

    /**
     * @namespace External
     */
    function storyPreviewCard() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf storyApp.story.directives.storyPreviewCard
         */
        var directive = {
            restrict: 'E',
            //controller: 'ArtistExternalCTRL',
            //controllerAs: 'externalModel',
            templateUrl: 'partials/story/_storyPreview.html',
            replace: true,
            //scope: {
            //    playlist: "="
            //}
        }

        //directive.link = function(scope, element, attributes) {
        //    console.log("Directive initialized!", scope.external);
        //}

        return directive;

    }

})();