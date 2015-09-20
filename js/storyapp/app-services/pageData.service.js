angular.module('storyApp').factory('PageData', function(){

    var service = {};

    service.GetSafeData = function(data) {
        console.log("Page data:", data);
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

        var providedMeasurements = JSON.parse(data.measurements);

        for(var measurementType in safeData.measurements) {
            console.log("Measurement type: " + measurementType);
            if(providedMeasurements[measurementType]) {
                safeData.measurements[measurementType] = providedMeasurements[measurementType];
            }
        }
        if(providedMeasurements.containerWidth) {
            console.log("Container width provided", providedMeasurements.containerWidth);
        }

        console.log("Provided JSON data", providedMeasurements);

        return safeData;
    }

    return service;

});