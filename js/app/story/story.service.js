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
        service.stringifyElements = stringifyElements;
        return service;

        function prep(data) {
            //var preppedData = data;
            //
            for(var i = 0, len = data.pages.length; i < len; i++) {
                var page = data.pages[i];
                page = _prepPage(page);
            }

            return data;
        }

        function stringifyElements(elements) {
            return angular.toJson(elements);
        }

        // Private functions

        function _prepPage(page) {

            page.test = "boop";

            page.measurements_prepped = _prepMeasurements(page.measurements);
            page.elements_prepped = _prepElements(page.elements);

            return page;
        }

        function _prepMeasurements(measurementsString) {

            var measurements = {
                container_width: "1024px",
                vertical_offset: "50px",
                horizontal_offset: "80px",
                text_width: "300px",
                text_height: "350px",
                text_vertical: "top",
                text_horizontal: "left"
            }

            if(measurementsString) {
                //measurements = JSON.parse(measurementsString); todo add back
            }

            return measurements;

        }

        function _prepElements(elementsString) {
            var elements_prepped = [];

            elementsString = '[' +
                '{"text":"Lorem ipsum woopum","font_size":"42px","color":"#000000","text_align":"left"},' +
                '{"text":"Bananananana","font_size":"22px","color":"#004892","text_align":"center"},' +
                '{"text":"Small writing!","font_size":"14px","color":"#000000","text_align":"right"}' +
                ']';

            if(elementsString) {
                elements_prepped = JSON.parse(elementsString);
            }

            return elements_prepped;
        }

    }

})();