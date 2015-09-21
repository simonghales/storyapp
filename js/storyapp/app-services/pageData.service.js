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
                textHeight : "180px",
                element_groups : [
                    {
                        elements : [
                            {
                                type : "heading",
                                text : "",
                                styles : ""
                            },
                            {
                                type : "subheading",
                                text : "",
                                styles : ""
                            },
                            {
                                type : "description",
                                text : "",
                                styles : ""
                            },
                        ]
                    }
                ]
            }
        }

        var providedMeasurements = JSON.parse(data.measurements);

        for(var measurementType in safeData.measurements) {
            if(providedMeasurements[measurementType]) {
                safeData.measurements[measurementType] = providedMeasurements[measurementType];
            }
        }

        if(providedMeasurements.element_groups && providedMeasurements.element_groups.length > 0) {
            safeData.element_groups = providedMeasurements.element_groups;
        }

        if(providedMeasurements.containerWidth) {
            //console.log("Container width provided", providedMeasurements.containerWidth);
        }

        //console.log("Provided JSON data", providedMeasurements);

        console.log("Final data", safeData);

        return safeData;
    }

    return service;

});