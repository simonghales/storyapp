/**
 * Authentication
 * @namespace app.image.services
 */
(function () {
    'use strict';

    angular
        .module('app.image.services')
        .factory('ImageService', ImageService);

    ImageService.$inject = [];

    /**
     * @namespace ImageService
     * @returns {Factory}
     */
    function ImageService() {
        var service = {};

        service.resizeImage = resizeImage;

        return service;

        function resizeImage() {
            console.log("Resize the image!");
        }

    }

})();