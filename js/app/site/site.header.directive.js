/**
 * storyPage
 * @namespace app.site.directives
 */
(function () {
    'use strict';

    angular
        .module('app.site.directives')
        .directive('siteHeader', siteHeader);

    /**
     * @namespace siteHeader
     */
    function siteHeader() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.site.directives.siteHeader
         */
        var directive = {
            restrict: 'E',
            templateUrl: 'partials/_header.html',
            replace: true,
        }

        return directive;

    }

})();