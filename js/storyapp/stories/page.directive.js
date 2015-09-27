angular.module('storyApp').directive('pageElement', function() {

    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "js/storyapp/stories/_page.html";
    directive.controller = PageCTRL;
    directive.controllerAs = "page";

    directive.link = function(scope, element, attributes) {
    }

    return directive;
});