(function() {

    angular
        .module('app.story.controllers')
        .controller('PageOptionsCTRL', PageOptionsCTRL);

    PageOptionsCTRL.$inject = ['$scope', 'ModalsService'];

    /* @ngInject */
    function PageOptionsCTRL($scope, ModalsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.deletePage = deletePage;

        activate();

        ////////////////

        function activate() {
            console.log("Scope", $scope);
        }

        function deletePage(page, index) {
            freezeSite();
            var data = page;
            var modal = ModalsService.deleteStoryPage(data);
            modal.closePromise.then(function(data) {
                if(data && data.value && data.value == "deleted") {
                    _removePage(index);
                }
            })
            console.log("Delete page and pass", page);
        }

        // Private function

        function _removePage(index) {
            // A bit hacky...
            console.log("Remove, index: " + index);
            $scope.$parent.$parent.story.removePage(index);
            // need to remove page from the list
        }

    }

})();