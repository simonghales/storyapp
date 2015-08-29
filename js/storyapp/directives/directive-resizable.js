// Source: http://stackoverflow.com/questions/23066731/using-jqueryui-resizeable-with-angularjs
storyApp.directive('resizable', ['$rootScope', 'Author', function ($rootScope, Author) {

    return {
        restrict: 'A',
        scope: {
            resizableConfig: '=',
        },
        link: function postLink(scope, elem, attrs) {

            scope.editing = Author.getEditing();
            var resizableConfig = scope.resizableConfig;

            elem.resizable(resizableConfig);

            if(!scope.editing) {
                elem.resizable("disable");
            }

            $rootScope.$on('author-editingChanged', function(event, value) {
                scope.editing = value;
                if(!scope.editing) {
                    elem.resizable("disable");
                } else {
                    elem.resizable("enable");
                }
            });

        }
    };
}]);