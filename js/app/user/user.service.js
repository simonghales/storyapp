/**
 * Authentication
 * @namespace app.user.services
 */
(function () {
    'use strict';

    angular
        .module('app.user.services')
        .factory('UserResource', UserResource);

    UserResource.$inject = ['$cookies', 'Restangular'];

    /**
     * @namespace UserResource
     * @returns {Factory}
     */
    function UserResource($cookies, Restangular) {
        var service = Restangular.service('api/users');
        service.register = Restangular.service('api/users/create');
        service.getCurrentUserAndStore = getCurrentUserAndStore;
        service.isStoredUser = isStoredUser;
        service.getStoredUser = getStoredUser;
        service.storeUser = storeUser;
        return service;

        function getCurrentUserAndStore() {
            service.one('current').get()
                .then(function(data) {
                    service.storeUser(data.plain());
                }, function(error) {
                   console.log("Failed to get current user", error);
                });
        }

        function isStoredUser() {
            return !!$cookies.get('user');
        }

        function getStoredUser() {
            if(!$cookies.get('user')) return null;
            return JSON.parse($cookies.get('user'));
        }

        function storeUser(user) {
            $cookies.put('user', JSON.stringify(user));
        }

    }

})();