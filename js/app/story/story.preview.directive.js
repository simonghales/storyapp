/**
 * storyPreview
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('storyPreview', storyPreview);

    /**
     * @namespace storyPreview
     */
    function storyPreview() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.storyPreview
         */
        var directive = {
            restrict: 'E',
            //controller: 'ArtistExternalCTRL',
            //controllerAs: 'externalModel',
            templateUrl: 'partials/story/_storyPreview.html',
            replace: true,
            //scope: {
            //    app: "="
            //}
        }

        return directive;

    }

})();