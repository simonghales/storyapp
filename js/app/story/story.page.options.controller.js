(function() {

    angular
        .module('app.story.controllers')
        .controller('PageOptionsCTRL', PageOptionsCTRL);

    PageOptionsCTRL.$inject = ['$scope', 'Restangular', 'PageResource', 'ModalsService'];

    /* @ngInject */
    function PageOptionsCTRL($scope, Restangular, PageResource, ModalsService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.changeImage = changeImage;
        vm.deletePage = deletePage;
        vm.savePage = savePage;

        activate();

        ////////////////

        function activate() {
        }

        function changeImage(page) {
            freezeSite();
            var data = {
                image: page.background_image_urls[0],
            };
            var modal = ModalsService.uploadImage(data);
            modal.closePromise.then(function(data) {
                if(data && data.value && data.value.id) {
                    _updateImage(page, data.value);
                }
            })
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

        function savePage(page) {
            _savePage(page);
        }

        // Private function

        function _removePage(index) {
            // A bit hacky...
            $scope.$parent.$parent.story.removePage(index);
        }

        function _updateImage(page, image) {
            console.log("Updated page", page);
            page.background_image_urls[0] = image;
            page.background_images[0] = image.id;
            _savePage(page);
        }

        function _savePage(page) {
            var restPage = Restangular.restangularizeElement(null, page, 'api/storypages');
            restPage.put()
                .then(function(data) {
                    console.log("Successfully updated!", data);
                }, function(error) {
                    console.log("Failed to updated", error);
                });
        }

    }

})();