storyApp.controller('ImageUpload', ['$scope', 'Upload', 'ImgurService', 'StoryService', function($scope, Upload, ImgurService, StoryService) {

    console.log("Init imageUpload controller!");

    var imageUpload = this;

    imageUpload.url = "";
    imageUpload.image = "";
    imageUpload.uploadedImage = null;

    imageUpload.uploadFile = function(file) {

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

            imageUpload.uploadUrl(response.data.data.link);

            //file.result = response.data;
        }, function (response) {
            if (response.status > 0) {
                console.log("Something went wrong :(");
            }
        });

        file.upload.progress(function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            console.log("Progress underway!", file.progress);
        });

    }

    imageUpload.uploadUrlCheck = function(formValid, url) {
        if(!formValid) {
            console.log("Form is invalid");
            return;
        }
        imageUpload.uploadUrl(url);
    }

    imageUpload.uploadUrl = function(url) {
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

