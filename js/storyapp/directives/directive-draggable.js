angular.module('storyApp').directive('dragMe', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            //var options = scope.$eval(attrs.draggable); //allow options to be passed in
            var options = scope.$eval(attrs.dragOptions); //allow options to be passed in
            console.log("Provided options", options);
            elm.draggable(options);
        }
    };
});