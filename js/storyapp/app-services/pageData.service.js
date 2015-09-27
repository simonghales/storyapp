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
                                styles : {
                                    color : "#000000",
                                    fontSize : "18px",
                                    textAlign : "left"
                                }
                            },
                            {
                                type : "subheading",
                                text : "",
                                styles : {
                                    color : "#000000",
                                    fontSize : "18px",
                                    textAlign : "left"
                                }
                            },
                            {
                                type : "description",
                                text : "",
                                styles : {
                                    color : "#000000",
                                    fontSize : "18px",
                                    textAlign : "left"
                                }
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
            safeData.measurements.element_groups = providedMeasurements.element_groups;
        } else {
            console.log("Elements haven't been provided", safeData);
        }

        // temp adding in styles : ""
        for(var i = 0; i < safeData.measurements.element_groups[0].elements.length; i++) {
            console.log("Checking styles", safeData.measurements.element_groups[0].elements[i]);
            if(safeData.measurements.element_groups[0].elements[i].styles == "") {
                safeData.measurements.element_groups[0].elements[i].styles = {
                    color : "#000000",
                    fontSize : "18px",
                    textAlign : "left"
                };
            }
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