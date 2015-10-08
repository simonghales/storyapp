/**
 * storyPage
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('storyPage', storyPage);

    /**
     * @namespace External
     */
    function storyPage() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.storyPage
         */
        var directive = {
            restrict: 'E',
            //controller: 'ArtistExternalCTRL',
            //controllerAs: 'externalModel',
            templateUrl: 'partials/story/_storyPage.html',
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