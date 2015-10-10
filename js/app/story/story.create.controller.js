angular
    .module('app.story.controllers')
    .controller('CreateStoryCTRL', CreateStoryCTRL);

CreateStoryCTRL.$inject = ['$rootScope', '$scope', '$http', 'Upload', 'ImageService', 'API_URL'];

/* @ngInject */
function CreateStoryCTRL($rootScope, $scope, $http, Upload, ImageService, API_URL) {
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
        if(!file || vm.states.image.busy) return;

        vm.states.image.busy = true;
        vm.states.image.prepping = true;
        vm.states.image.processing = false;
        vm.states.image.uploading = false;

        //ImageService.resizeImage(file, function(dataURL) {

            //var fileBlob = ImageService.dataURItoBlob(dataURL);

            // TODO reimplement fileBlob

            console.log("File", file);

            vm.states.image.prepping = false;
            vm.states.image.uploading = true;

            var fileUpload = Upload.upload({
                url: API_URL + 'api/image/.json',
                file: file,
                fields: {
                    //'original': file,
                    'remote_url':''
                },
                //data: {
                //    original: file,
                //    remote_url: ''
                //},
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    //'Accept': 'application/json',
                    //'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
                    Authorization: $http.defaults.headers.common['Authorization']
                },
                fileFormDataName : 'original',
            })

            //file.upload = Upload.http({
            //    url: API_URL + 'api/image/.json',
            //    method: 'POST',
            //    headers: {
            //        Accept: 'application/json',
            //        'Authorization': $http.defaults.headers.common['Authorization']
            //    },
            //    data: {
            //        original: file,
            //        remote_url: ''
            //    },
            //    //file: file,
            //    //fields: { 'remote_url': '' },
            //    //fileFormDataName : 'original'
            //});

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

        //});
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