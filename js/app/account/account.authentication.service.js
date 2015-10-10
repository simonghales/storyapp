/**
 * Authentication
 * @namespace app.account.services
 */
(function () {
    'use strict';

    angular
        .module('app.account.services')
        .factory('AuthenticationResource', AuthenticationResource);

    AuthenticationResource.$inject = ['$http', '$cookies', 'Restangular'];

    /**
     * @namespace AuthenticationResource
     * @returns {Factory}
     */
    function AuthenticationResource($http, $cookies, Restangular) {
        var service = Restangular.service('api-token-auth');

        service.isAuth = isAuth;
        service.getAuth = getAuth;
        service.setAuth = setAuth;
        service.storeAuth = storeAuth;
        service.clearAuth = clearAuth;

        return service;

        function isAuth() {
            return !!$cookies.get('JWT');
        }

        function getAuth() {
            if(!$cookies.get('JWT')) return null;
            return $cookies.get('JWT');
        }

        function setAuth(token, storeToken) {
            $http.defaults.headers.common['Authorization'] = 'JWT ' + token; // jshint ignore:line
            $http.defaults.headers.common['Content-Type'] = 'application/json'; // jshint ignore:line
            if(storeToken) {
                service.storeAuth(token);
            }
        }

        function storeAuth(token) {
            $cookies.put('JWT', token);
        }

        function clearAuth() {
            $http.defaults.headers.common['Authorization'] = null;
            $cookies.remove('JWT');
        }

    }

})();