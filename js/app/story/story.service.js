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
        var service = Restangular.service('stories');
        service.prep = prep;
        return service;

        function prep(data) {
            //var preppedData = data;
            //
            //for(var i = 0, len = data.pages.length; i < len; i++) {
            //    if(data.pages[i].deleted) {
            //        data.pages.splice(i, 1);
            //    }
            //}

            return data;
        }

    }

})();