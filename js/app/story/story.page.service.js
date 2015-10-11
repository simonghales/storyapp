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
        return service;
    }

})();