angular
    .module('app.site.controllers')
    .controller('SiteCTRL', SiteCTRL);

SiteCTRL.$inject = ['$rootScope', 'ModalsService'];

/* @ngInject */
function SiteCTRL($rootScope, ModalsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.promptSignIn = promptSignIn;
    vm.promptSignUp = promptSignUp;
    vm.promptCreateStory = promptCreateStory;
    vm.signOut = signOut;

    activate();

    ////////////////

    function activate() {
    }

    function promptSignIn() {
        freezeSite();
        var signIn_modal = ModalsService.signIn();
        signIn_modal.closePromise.then(function(data) {
            if(data.value && data.value === "signUp") {
                vm.promptSignUp();
            }
        });
    }

    function promptSignUp() {
        freezeSite();
        var signUp_modal = ModalsService.signUp();
        signUp_modal.closePromise.then(function(data) {
            if(data.value && data.value === "signIn") {
                vm.promptSignIn();
            }
        });
    }

    function promptCreateStory() {
        if(!$rootScope.states.signedIn) return vm.promptSignIn();
        freezeSite();
        var createStory_modal = ModalsService.createStory();
    }

    function signOut() {
        $rootScope.$broadcast('user-signedOut');
    }

}