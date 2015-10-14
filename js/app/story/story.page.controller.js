angular
    .module('app.story.controllers')
    .controller('StoryPageCTRL', StoryPageCTRL);

StoryPageCTRL.$inject = ['$scope', 'Restangular', 'StoryResource', 'PageResource', 'ModalsService'];

/* @ngInject */
function StoryPageCTRL($scope, Restangular, StoryResource, PageResource, ModalsService) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        pendingChanges: false,
        updating: false,
    }

    vm.page = $scope.page;

    vm.activate = activate;
    vm.pendingChanges = pendingChanges;
    vm.moveText = moveText;
    vm.changeImage = changeImage;
    vm.deletePage = deletePage;
    vm.savePage = savePage;

    activate();

    ////////////////

    function activate() {
        if(vm.page.defaultTemplate) {
            _createPage();
            vm.page.defaultTemplate = null;
        }

        //console.log("Page's elements", vm.page.elements_prepped);
        //console.log("Page's scope", vm.page);

        //console.log("Stringified", StoryResource.stringifyElements(vm.page.elements_prepped));
    }

    function pendingChanges() {
        vm.states.pendingChanges = true;
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

    function moveText(direction) {
        //console.log("Update direction!");
        if(direction == "top") {
            vm.page.measurements_prepped.text_vertical = "top";
            return;
        }
        if(direction == "bottom") {
            vm.page.measurements_prepped.text_vertical = "bottom";
            return;
        }
        if(direction == "left") {
            vm.page.measurements_prepped.text_horizontal = "left";
            return;
        }
        if(direction == "right") {
            vm.page.measurements_prepped.text_horizontal = "right";
            return;
        }
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
        vm.page = StoryResource.prepSavePage(vm.page);
        _savePage();
        console.log("Prep page", StoryResource.prepSavePage(vm.page));
        // convert back to correct format
        //_savePage(vm.page);
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
        if(vm.states.updating) return;
        vm.states.updating = true;
        console.log("Gonna save page", vm.page);
        var restPage = Restangular.restangularizeElement(null, vm.page, 'api/storypages');
        restPage.put()
            .then(function(data) {
                console.log("Successfully updated!", data);
                vm.states.pendingChanges = false;
                vm.states.updating = false;
            }, function(error) {
                console.log("Failed to updated", error);
                vm.states.updating = false;
            });
    }

    function _createPage() {
        PageResource.post(vm.page)
            .then(function(data) {
                vm.page.id = data.id;
                console.log("Created page", data);
            }, function(error) {
                console.log("Error", error);
            });
    }

    // Configurations

    vm.widthConfig = {
        handles : "w, e",
        resize : function(event, ui) {
            var newWidth = ui.originalSize.width+((ui.size.width - ui.originalSize.width)*2);
            $(this).width("auto").position({
                of: $(this).parent(),
                my: "center center",
                at: "center center"
            });
            $(this).css({
                "left" : "auto",
                "right" : "auto",
                "width" : "auto",
                "max-width" : newWidth
            });
            ui.size.width = newWidth;
            //console.log("EXECUTING RESIZE FUNCTION", newWidth);
        },
        stop : function(event, ui) {
            console.log("Finished resizing", ui.size.width);
            vm.page.measurements_prepped.container_width = ui.size.width;
            vm.states.pendingChanges = true;
            //vm.safeData.measurements.containerWidth = ui.size.width;
            //vm.updateMeasurements();
            $scope.$apply();
        }
    };

    vm.offsetsConfig = {
        handles: "all",
        resize: function(event, ui) {

            var parentHeight = $(this).parent().height();
            var parentWidth = $(this).parent().width();

            $(this).width("auto").height("auto").position({
                of: $(this).parent(),
                my: "center center",
                at: "center center"
            });

            var horizontalOffset = $(this).css("left");
            var verticalOffset = $(this).css("top");

            console.log("Original offsets", horizontalOffset, verticalOffset);

            if(isNaN(ui.size.width) || ui.size.width == ui.originalSize.width) {
                var newWidth = ui.originalSize.width;
            } else {
                var newWidth = ui.size.width + (ui.size.width - ui.originalSize.width) / 2;
                var horizontalOffset = (parentWidth - newWidth) / 2;
                console.log("Fixed up horizontal offset", horizontalOffset, newWidth, ui.size.width, ui.originalSize.width);
            }
            if(isNaN(ui.size.height) || ui.size.height == ui.originalSize.height) {
                var newHeight = ui.originalSize.height;
            } else {
                var newHeight = ui.size.height + (ui.size.height - ui.originalSize.height) / 2;
                var verticalOffset = (parentHeight - newHeight) / 2;
                console.log("Fixed up vertical offset", verticalOffset, newHeight, ui.size.height, ui.originalSize.height);
            }

            if(horizontalOffset < 10) {
                horizontalOffset = 10;
            }
            if(verticalOffset < 10) {
                verticalOffset = 10;
            };
            ui.size.height = "auto";
            ui.size.width = "auto";
            $(this).css({
                "top" : verticalOffset,
                "bottom" : verticalOffset,
                "left" : horizontalOffset,
                "right" : horizontalOffset
            });
            ui.size.verticalOffset = verticalOffset;
            ui.size.horizontalOffset = horizontalOffset;
            console.log("Resized", verticalOffset, horizontalOffset);
        },
        stop : function(event, ui) {
            //var parentHeight = $(this).parent().height();
            //var parentWidth = $(this).parent().width();
            //var horizontalOffset = (parentWidth - ui.size.widthTemp) / 2;
            //var verticalOffset = (parentHeight - ui.size.heightTemp) / 2;
            var verticalOffset = ui.size.verticalOffset;
            var horizontalOffset = ui.size.horizontalOffset;
            vm.page.measurements_prepped.horizontal_offset = horizontalOffset;
            vm.page.measurements_prepped.vertical_offset = verticalOffset;

            vm.states.pendingChanges = true;

            console.log("Final", verticalOffset, horizontalOffset);
            $scope.$apply();
        }
    }

    vm.textConfig = {
        handles : "all",
        // containment : "parent",
        resize: function(event, ui) {
            $(this).css({
                "top" : "",
                "bottom" : "",
                "left" : "",
                "right" : ""
            });
        },
        stop : function(event, ui) {

            vm.page.measurements_prepped.text_width = ui.size.width;
            vm.page.measurements_prepped.text_height = ui.size.height;

            vm.states.pendingChanges = true;

            $scope.$apply();
        }
    }

}