angular
    .module('app.story.controllers')
    .controller('CreateStoryCTRL', CreateStoryCTRL);

CreateStoryCTRL.$inject = ['$rootScope', '$scope', '$http', '$location',
    'Upload', 'StoryResource', 'ImageService', 'API_URL'];

/* @ngInject */
function CreateStoryCTRL($rootScope, $scope, $http, $location,
                         Upload, StoryResource, ImageService, API_URL) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        busy: false,
        error: false,
        success: false,
        image: {
            busy: false,
            prepping: false,
            uploading: false,
            processing: false,
            error: false,
            uploadProgress: 0
        }
    }

    vm.input = {
        title: "",
        description: "",
        imageObj: null
    }

    vm.activate = activate;
    vm.uploadImage = uploadImage;
    vm.isValidForm = isValidForm;
    vm.submit = submit;

    activate();

    ////////////////

    function activate() {
    }

    function uploadImage(file) {
        if(!file || vm.states.image.busy) return;

        vm.states.image.busy = true;
        vm.states.image.prepping = true;
        vm.states.image.processing = false;
        vm.states.image.uploading = false;

        ImageService.resizeImage(file, function(dataURL) {

            var blob = ImageService.dataURItoBlob(dataURL);

            console.log("File", file, blob);

            vm.states.image.prepping = false;
            vm.states.image.uploading = true;

            var fileUpload = Upload.upload({
                url: API_URL + 'api/image/.json',
                file: {
                    "original" : blob
                },
                fields: {
                    'remote_url':''
                },
                headers: {
                    Authorization: $http.defaults.headers.common['Authorization']
                },
            })

            fileUpload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                vm.states.image.uploadProgress = file.progress;
                console.log("Progress: " + file.progress);
                if(file.progress == 100) {
                    vm.states.image.uploading = false;
                    vm.states.image.processing = true;
                }
            });

            fileUpload.then(function (response) {

                console.log("Succes??", response);

                vm.input.imageObj = response.data;

                vm.states.image.prepping = false;
                vm.states.image.processing = false;
                vm.states.image.uploading = false;
                vm.states.image.busy = false;

            }, function (response) {
                if (response.status > 0) {
                    console.log("Something went wrong :(");
                    vm.states.image.prepping = false;
                    vm.states.image.processing = false;
                    vm.states.image.uploading = false;
                    vm.states.image.busy = false;
                }
            });

        });
    }

    function isValidForm() {
        if(!vm.input.title) return false;
        if(!vm.input.description) return false;
        if(!vm.input.imageObj) return false;
        return true;
    }

    function submit() {
        if(!isValidForm() || vm.states.busy) return;
        vm.states.busy = true;

        StoryResource.post({
            title: vm.input.title,
            description: vm.input.description,
            profile_images: [vm.input.imageObj.id],
            banner_images: [],
            listed: true
        }).then(function(data) {
            console.log("Created story", data);
            vm.states.busy = false;
            $location.path('/s/' + data.id + '/' + slugify(data.title));
            $scope.closeThisDialog();
        }, function(error) {
            console.log("Error", error);
            vm.states.busy = false;
            vm.states.error = true;
        });

        console.log("Submit form!");
    }

}