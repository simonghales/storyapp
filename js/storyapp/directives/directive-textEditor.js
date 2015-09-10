storyApp.directive('textEditor', ['$rootScope', 'Editor', function($rootScope, Editor) {
    //return {
    //    restrict: 'A',
    //    templateUrl : "partials/_textEditor.html",
    //    link: function(scope, elm, attrs) {
    //
    //    }
    //};
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "partials/_textEditor.html";

    directive.link = function(scope, element, attributes) {


        $rootScope.$on('editor-display', function(event, value) {
            var offset = value;
            var height = element.height();
            var width = element.width();
            var windowHeight = $(window).height();
            var topOffset = offset.y;
            var leftOffset = offset.x - width - 15;
            console.log("Left offset: " + leftOffset);

            if(topOffset < 10) {
                console.log("This is going offscreen");
                topOffset = 10;
            }

            if(topOffset > (windowHeight - height)) {
                topOffset = windowHeight - height;
            }

            if(leftOffset < 10) {
                console.log("This is going offscreen!");
                leftOffset = 10;
            }

            element.css({
                top : topOffset + "px",
                left : leftOffset + "px"
            });
            element.show();
        });

        $rootScope.$on('editor-hide', function(event, value) {
            // hide this element
            element.hide();
        });

        element.hide();

    }

    return directive;
}]);