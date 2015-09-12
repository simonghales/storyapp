storyApp.factory('PageData', function(){

    var service = {};

    service.GetSafeData = function(data) {
        var safeData = {
            measurements : {
                containerWidth : "1024px",
                paddingVertical : "40px",
                paddingHorizontal : "40px",
                positionVertical : "top",
                positionHorizontal : "left",
                textWidth : "420px",
                textHeight : "180px"
            }
        }


        return safeData;
    }

    return service;

});