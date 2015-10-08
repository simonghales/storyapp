/**
 * Authentication
 * @namespace app.story.services
 */
(function () {
    'use strict';

    angular
        .module('app.story.services')
        .factory('StoryResource', StoryResource);

    StoryResource.$inject = ['Restangular'];

    /**
     * @namespace AppsResource
     * @returns {Factory}
     */
    function StoryResource(Restangular) {
        return Restangular.service('stories');
    }

})();