angular
    .module('app.story.controllers')
    .controller('StoryPageCTRL', StoryPageCTRL);

StoryPageCTRL.$inject = ['$scope', 'Restangular', 'PageResource', 'ModalsService'];

/* @ngInject */
function StoryPageCTRL($scope, Restangular, PageResource, ModalsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.page = $scope.page;

    activate();
    vm.changeImage = changeImage;
    vm.deletePage = deletePage;
    vm.savePage = savePage;

    ////////////////

    function activate() {
        if(vm.page.defaultTemplate) {
            _createPage();
            vm.page.defaultTemplate = null;
        }
        //console.log("Page's scope", vm.page);

        //console.log("Stringified", StoryResource.stringifyElements(vm.page.elements_prepped));
    }

    function changeImage() {
        freezeSite();
        var data = {
            image: vm.page.background_image_urls[0],
        };
        var modal = ModalsService.uploadImage(data);
        modal.closePromise.then(function(data) {
            if(data && data.value && data.value.id) {
                _updateImage(data.value);
            }
        })
    }

    function deletePage(index) {
        freezeSite();
        var data = vm.page;
        var modal = ModalsService.deleteStoryPage(data);
        modal.closePromise.then(function(data) {
            if(data && data.value && data.value == "deleted") {
                _removePage(index);
            }
        })
        console.log("Delete page and pass", vm.page);
    }

    function savePage() {
        _savePage(vm.page);
    }

    // Private function

    function _removePage(index) {
        // A bit hacky...
        $scope.$parent.story.removePage(index);
    }

    function _updateImage(image) {
        console.log("Updated page", vm.page);
        vm.page.background_image_urls[0] = image;
        vm.page.background_images[0] = image.id;
        _savePage();
    }

    function _savePage() {
        console.log("Gonna save page", vm.page);
        var restPage = Restangular.restangularizeElement(null, vm.page, 'api/storypages');
        restPage.put()
            .then(function(data) {
                console.log("Successfully updated!", data);
            }, function(error) {
                console.log("Failed to updated", error);
            });
    }

    // Private functions

    function _createPage() {
        PageResource.post(vm.page)
            .then(function(data) {
                vm.page.id = data.id;
                console.log("Created page", data);
            }, function(error) {
                console.log("Error", error);
            });
    }

}