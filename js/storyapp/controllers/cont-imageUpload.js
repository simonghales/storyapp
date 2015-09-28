(function () {
    'use strict';

    angular
        .module('storyApp')
        .controller('ImageUpload', ImageUpload);

    ImageUpload.$inject = ['$scope', 'Upload', 'ImgurService', 'StoryService'];

    /* @ngInject */
    function ImageUpload($scope, Upload, ImgurService, StoryService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.resizeImage = resizeImage;
        vm.uploadFile = uploadFile;
        vm.uploadUrlCheck = uploadUrlCheck;
        vm.uploadUrl = uploadUrl;
        vm.updateImage = updateImage;
        vm.confirm = confirm;
        vm.cancel = cancel;

        vm.states = {
            busy: false,
            error: false,
            uploading: false,
            processing: false
        }
        vm.uploadProgress = 0;
        vm.url = "";
        vm.image = "";
        vm.uploadedImage = null;

        activate();

        ////////////////

        function activate() {
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

        function resizeImage(file, callback) {

            console.log("Provided file", file);

            var reader = new FileReader();
            reader.onloadend = function() {

                var tempImg = new Image();
                tempImg.src = reader.result;
                tempImg.onload = function() {

                    var MAX_WIDTH = 1920;
                    var MAX_HEIGHT = 1920;
                    var tempW = tempImg.width;
                    var tempH = tempImg.height;
                    if (tempW > tempH) {
                        if (tempW > MAX_WIDTH) {
                            tempH *= MAX_WIDTH / tempW;
                            tempW = MAX_WIDTH;
                        }
                    } else {
                        if (tempH > MAX_HEIGHT) {
                            tempW *= MAX_HEIGHT / tempH;
                            tempH = MAX_HEIGHT;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = tempW;
                    canvas.height = tempH;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, tempW, tempH);
                    var dataURL = canvas.toDataURL("image/jpeg");
                    var data = 'image=' + dataURL;

                    callback(dataURL);


                }

            }
            reader.readAsDataURL(file);
        }

        function uploadUrlCheck(formValid, url) {
            if(!formValid) {
                console.log("Form is invalid");
                return;
            }

            if(vm.states.busy) return;
            vm.states.busy = true;

            vm.uploadUrl(url);
        }

        function uploadUrl(url) {
            vm.states.processing = true;

            var sendData = {
                original : null,
                remote_url : url
            }

            StoryService.UploadImage(sendData).then(function(data) {

                // TODO: Check if successful response
                if(data.success == false) {
                    console.log("Error: " + data.message);
                } else {
                    console.log("Successfully sent to Heroku!", data);
                    vm.uploadedImage = data.data;
                    vm.updateImage();
                }
            }, function(error) {
                console.log("Error: " + error);
            });
        }

        function updateImage() {
            vm.states.uploading = false;
            vm.states.processing = false;
            vm.states.busy = false;
            vm.image = vm.uploadedImage.remote_url;
        }

        function confirm() {
            console.log("Finished on this page!", vm.uploadedImage);
            if(vm.uploadedImage != null) {
                $scope.closeThisDialog(vm.uploadedImage);
            } else {
                $scope.closeThisDialog();
            }
        }

        function cancel() {
            $scope.closeThisDialog();
        }


    }

})();

