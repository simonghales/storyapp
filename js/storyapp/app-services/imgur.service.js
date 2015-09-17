angular.module('storyApp').factory('ImgurService', ['$http', 'Upload', 'API_URL', function($http, Upload, API_URL){

    var service = {};

    service.UploadImage = UploadImage;

    return service;

    var baseAPI = "https://api.imgur.com/3/";

    var req = {
        //method: 'POST',
        url: baseAPI,
        headers: {
            'Authorization': "Client-ID bc7544395115c3b"
        },
        //data: { test: 'test' }
    }

    req.method = "POST";
    req.url = baseAPI + "image";
    req.data = "need image data here...";

    function UploadImage(file) {

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
            console.log("Succes??", response);
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

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

}]);