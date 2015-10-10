/**
 * Authentication
 * @namespace app.services
 */
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('ModalsService', ModalsService);

    ModalsService.$inject = ['ngDialog'];

    /**
     * @namespace ModalsService
     * @returns {Factory}
     */
    function ModalsService(ngDialog) {
        var service = {};

        service.signIn = signIn;
        service.signUp = signUp;
        service.createStory = createStory;

        return service;

        function signIn() {
            return ngDialog.open({
                template: 'partials/account/_signIn.html',
                className: 'yepDialog-theme-default',
                controller: 'SignInCTRL',
                controllerAs: 'modalVM',
                preCloseCallback: function() {
                    unfreezeSite();
                }
            });
        }

        function signUp() {
            return ngDialog.open({
                template: 'partials/account/_signUp.html',
                className: 'yepDialog-theme-default',
                controller: 'SignUpCTRL',
                controllerAs: 'modalVM',
                preCloseCallback: function() {
                    unfreezeSite();
                }
            });
        }

        function createStory() {
            return ngDialog.open({
                template: 'partials/story/_createStory.html',
                className: 'yepDialog-theme-default yepDialog-theme--wide',
                controller: 'CreateStoryCTRL',
                controllerAs: 'modalVM',
                preCloseCallback: function() {
                    unfreezeSite();
                }
            });
        }

    }

})();