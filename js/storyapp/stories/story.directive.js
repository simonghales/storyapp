angular.module('storyApp').directive('storyElement', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "js/storyapp/stories/_story.html";

    directive.link = function(scope, element, attributes) {

        console.log("Directive loaded!");

    }

    return directive;
});