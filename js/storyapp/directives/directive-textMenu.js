angular.module('storyApp').directive('textMenu', ['$rootScope', 'Editor', function($rootScope, Editor) {
    var directive = {};

    directive.restrict = 'E'; /* restrict this directive to elements */
    directive.templateUrl = "partials/_textMenu.html";

    directive.link = function(scope, element, attributes) {

    }

    return directive;
}]);