(function() {

    angular
        .module('app.image.controllers')
        .controller('UploadImageCTRL', UploadImageCTRL);

    UploadImageCTRL.$inject = ['$scope', '$http', 'Upload', 'ImageService', 'API_URL'];

    /* @ngInject */
    function UploadImageCTRL($scope, $http, Upload, ImageService, API_URL) {
        /* jshint validthis: true */
        var vm = this;

        vm.states = {
            busy: false,
            error: false,
            prepping: false,
            processing: false,
            uploading: false,
            uploadProgress: 0,
        }

        vm.data = $scope.ngDialogData;
        vm.image = null;

        vm.activate = activate;
        vm.confirm = confirm;
        vm.uploadImage = uploadImage;

        activate();

        ////////////////

        function activate() {
            if(vm.data.image) {
                vm.image = vm.data.image;
            }
        }

        function confirm() {
            $scope.closeThisDialog(vm.image);
        }

        function uploadImage(file) {
            if(!file || vm.states.busy) return;

            vm.states.busy = true;
            vm.states.prepping = true;
            vm.states.processing = false;
            vm.states.uploading = false;

            ImageService.resizeImage(file, function(dataURL) {

                var blob = ImageService.dataURItoBlob(dataURL);

                vm.states.prepping = false;
                vm.states.uploading = true;

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
                    vm.states.uploadProgress = file.progress;
                    if(file.progress == 100) {
                        vm.states.uploading = false;
                        vm.states.processing = true;
                    }
                });

                fileUpload.then(function (response) {

                    vm.image = response.data;

                    vm.states.prepping = false;
                    vm.states.processing = false;
                    vm.states.uploading = false;
                    vm.states.busy = false;

                }, function (response) {
                    if (response.status > 0) {
                        vm.states.prepping = false;
                        vm.states.processing = false;
                        vm.states.uploading = false;
                        vm.states.busy = false;
                    }
                });

            });
        }

    }

})();