/**
 * storyMenu
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('storyMenu', storyMenu);

    /**
     * @namespace storyMenu
     */
    function storyMenu() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.storyMenu
         */
        var directive = {
            restrict: 'E',
            //controller: 'StoryPageCTRL',
            //controllerAs: 'pageVM',
            templateUrl: 'partials/story/_storyMenu.html',
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