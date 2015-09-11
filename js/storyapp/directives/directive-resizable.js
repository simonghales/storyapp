// Source: http://stackoverflow.com/questions/23066731/using-jqueryui-resizeable-with-angularjs
storyApp.directive('resizable', ['$rootScope', 'Author', function ($rootScope, Author) {

    return {
        restrict: 'A',
        scope: {
            resizableConfig: '=',
            positionVertical: '=',
            positionHorizontal: '=',
        },
        link: function postLink(scope, elem, attrs) {

            scope.editing = Author.getEditing();
            var resizableConfig = scope.resizableConfig;

            elem.resizable(resizableConfig);

            if(!scope.editing) {
                elem.resizable("disable");
            }

            scope.$on('$destroy',function() {
                authorEditingChanged(); // removes rootscope listener
            });

            var authorEditingChanged = $rootScope.$on('author-editingChanged', function(event, value) {
                scope.editing = value;
                if(!scope.editing) {
                    console.log("Need to disable resizeable");
                    elem.resizable("disable");
                } else {
                    console.log("Need to enable resizeable");
                    elem.resizable("enable");
                }
            });

            // Can't re-init handles
            // scope.$watch('positionHorizontal', function(val){
            //     elem.resizable("option", "handles", "n");
            //     console.log("Horizontal position changed", val);
            //     // update the handles
            // });

            // scope.$watch('positionVertical', function(val){
            //     elem.resizable("option", "handles", "n");
            //     console.log("Vertical position changed", val);
            //     // update the handles
            // });

            // cant do this through broadcast... need to communicate solely to this instance
            $rootScope.$on('author-textPositionChanged', function(event, value) {
                // update the handles and the way the resize function is handled
                var newPosition = value;
                switch(newPosition) {
                    case "":
                        // do something
                        return;
                }
            });

        }
    };
}]);