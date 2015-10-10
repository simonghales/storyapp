angular
    .module('app.story.controllers')
    .controller('CreateStoryCTRL', CreateStoryCTRL);

CreateStoryCTRL.$inject = ['$rootScope', '$scope', 'Upload', 'ImageService'];

/* @ngInject */
function CreateStoryCTRL($rootScope, $scope, Upload, ImageService) {
    /* jshint validthis: true */
    var vm = this;

    vm.states = {
        busy: false,
        error: false,
        success: false,
        image: {
            busy: false,
            uploading: false,
            processing: false,
            error: false
        }
    }

    vm.input = {
        title: "",
        description: "",
        image: '',
        imageObj: {}
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

        ImageService.resizeImage();

        //if(!file || vm.states.image.busy) return;
        //vm.states.image.busy = true;
        //vm.states.image.uploading = true;
    }

    function uploadFile(file) {

        if(!file || vm.states.busy) return;

        vm.states.busy = true;
        vm.states.uploading = false;
        vm.uploadProgress = 0;
        vm.states.processing = true;

        vm.resizeImage(file, function(dataURL) {
            vm.states.processing = false;
            vm.states.uploading = true;

            console.log("Image data", dataURL);

            file.upload = Upload.http({
                url: 'https://api.imgur.com/3/image',
                method: 'POST',
                headers: {
                    //'Content-Type': file.type,
                    Accept: 'application/json',
                    'Authorization': "Client-ID bc7544395115c3b"
                },
                data: {
                    image: dataURL.split(',')[1],
                    type: "base64"
                }
            });

            file.upload.then(function (response) {

                // TODO: Check if successfull response

                console.log("Succes??", response);

                vm.states.uploading = false;
                vm.states.processing = true;
                vm.uploadUrl(response.data.data.link);

                //file.result = response.data;
            }, function (response) {
                if (response.status > 0) {
                    console.log("Something went wrong :(");
                }
            });

            file.upload.progress(function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                vm.uploadProgress = file.progress;
                if(file.progress == 100) {
                    vm.states.uploading = false;
                    vm.states.processing = true;
                }
                console.log("Progress underway!", file.progress);
            });

        });

    }

    function isValidForm() {
        if(!vm.input.title) return false;
        if(!vm.input.description) return false;
        return true;
    }

    function submit() {
        if(!isValidForm()) return;
        console.log("Submit form!");
    }

}