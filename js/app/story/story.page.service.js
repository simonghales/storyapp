/**
 * PageResource
 * @namespace app.story.services
 */
(function () {
    'use strict';

    angular
        .module('app.story.services')
        .factory('PageResource', PageResource);

    PageResource.$inject = ['Restangular'];

    /**
     * @namespace PageResource
     * @returns {Factory}
     */
    function PageResource(Restangular) {
        var service = Restangular.service('api/storypages');
        service.newPageTemplate = newPageTemplate;
        return service;

        function newPageTemplate(storyId) {
            return {
                id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 9001),
                defaultTemplate : true,
                story: storyId,
                background_images : [],
                background_image_urls : [],
                measurements : "[]",
                background_colour : "#E0E0E0",
                element_groups : [],
                elements: ""
            }
        }

    }

})();