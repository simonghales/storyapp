storyApp.directive('dragMe', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var options = scope.$eval(attrs.draggable); //allow options to be passed in
            elm.draggable(options);
        }
    };
});