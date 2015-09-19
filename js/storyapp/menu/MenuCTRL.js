angular
    .module('storyApp')
    .controller('MenuCTRL', MenuCTRL)

.$inject = ['$scope'];

/* @ngInject */
function MenuCTRL($scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        userDropdownOpen: false
    }

    vm.activate = activate;

    activate();

    ////////////////

    function activate() {
    }


}