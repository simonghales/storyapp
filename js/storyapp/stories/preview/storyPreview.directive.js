angular
    .module('storyApp')
    .directive('storyPreview', storyPreview);

function storyPreview() {
    var directive = {
        link: link,
        templateUrl: 'js/storyapp/stories/preview/_storyPreview.html',
        restrict: 'EA',
        replace: true
    };
    return directive;

    function link(scope, element, attrs) {
        /* */
        console.log("Scope for this directive", scope);
    }
}