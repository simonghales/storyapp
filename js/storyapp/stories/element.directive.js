angular.module('storyApp').directive('textElement', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "js/storyapp/stories/_element.html";
    //directive.controller = PageCTRL;
    //directive.controllerAs = "page";

    directive.link = function(scope, element, attributes) {
    }

    return directive;
});