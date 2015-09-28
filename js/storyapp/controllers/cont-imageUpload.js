angular.module('storyApp').controller('ImageUpload', ['$scope', 'Upload', 'ImgurService', 'StoryService', function($scope, Upload, ImgurService, StoryService) {

    console.log("Init imageUpload controller!");

    var imageUpload = this;

    imageUpload.states = {
        busy: false,
        error: false,
        uploading: false,
        processing: false
    }
    imageUpload.uploadProgress = 0;
    imageUpload.url = "";
    imageUpload.image = "";
    imageUpload.uploadedImage = null;

    imageUpload.resizeImage = function(file) {

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

                console.log("Image data", data, dataURL);

            }

        }
        reader.readAsDataURL(file);
    }

    imageUpload.uploadFile = function(file) {

        if(!file || imageUpload.states.busy) return;

        imageUpload.states.busy = true;
        imageUpload.states.uploading = true;
        imageUpload.uploadProgress = 0;
        imageUpload.states.processing = false;

        imageUpload.resizeImage(file);

        /**

        file.upload = Upload.http({
            url: 'https://api.imgur.com/3/image',
            method: 'POST',
            headers: {
                'Content-Type': file.type,
                'Authorization': "Client-ID bc7544395115c3b"
            },
            data: file
        });

        file.upload.then(function (response) {

            // TODO: Check if successfull response

            console.log("Succes??", response);

            imageUpload.states.uploading = false;
            imageUpload.states.processing = true;
            imageUpload.uploadUrl(response.data.data.link);

            //file.result = response.data;
        }, function (response) {
            if (response.status > 0) {
                console.log("Something went wrong :(");
            }
        });

        file.upload.progress(function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            imageUpload.uploadProgress = file.progress;
            if(file.progress == 100) {
                imageUpload.states.uploading = false;
                imageUpload.states.processing = true;
            }
            console.log("Progress underway!", file.progress);
        });

        **/

    }

    imageUpload.uploadUrlCheck = function(formValid, url) {
        if(!formValid) {
            console.log("Form is invalid");
            return;
        }

        if(imageUpload.states.busy) return;
        imageUpload.states.busy = true;

        imageUpload.uploadUrl(url);
    }

    imageUpload.uploadUrl = function(url) {
        imageUpload.states.processing = true;

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
                imageUpload.uploadedImage = data.data;
                imageUpload.updateImage();
            }
        }, function(error) {
            console.log("Error: " + error);
        });
    }

    imageUpload.updateImage = function() {
        imageUpload.states.uploading = false;
        imageUpload.states.processing = false;
        imageUpload.states.busy = false;
        imageUpload.image = imageUpload.uploadedImage.remote_url;
    }

    //imageUpload.uploadFile = function(file) {
    //
    //    Upload.dataUrl(file).then(function(url) {
    //       console.log("Converted file!", url);
    //    });
    //
    //    console.log("Sending this data for upload", file);
    //    ImgurService.UploadImage(file)
    //        .then(function(data) {
    //            if(data.success) {
    //                console.log("Successfully loaded story data", data);
    //            } else {
    //                console.log("Failed to load", data);
    //            }
    //        }, function(error) {
    //            console.log("Error: " + error);
    //        })
    //}

    imageUpload.confirm = function() {
        console.log("Finished on this page!", imageUpload.uploadedImage);
        if(imageUpload.uploadedImage != null) {
            $scope.closeThisDialog(imageUpload.uploadedImage);
        } else {
            $scope.closeThisDialog();
        }
    }

    imageUpload.cancel = function() {
        $scope.closeThisDialog();
    }

}]);

