/**
 * pageOptions
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('pageOptions', pageOptions);

    /**
     * @namespace pageOptions
     */
    function pageOptions() {

        /**
         * @name pageOptions
         * @desc The directive to be returned
         * @memberOf app.story.directives.pageOptions
         */
        var directive = {
            restrict: 'E',
            controller: 'PageOptionsCTRL',
            controllerAs: 'pageOptionsVM',
            templateUrl: 'partials/story/_storyPageOptions.html',
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