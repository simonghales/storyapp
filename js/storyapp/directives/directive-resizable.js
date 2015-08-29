// Source: http://stackoverflow.com/questions/23066731/using-jqueryui-resizeable-with-angularjs
storyApp.directive('resizable', function () {

    return {
        restrict: 'A',
        scope: {
            // callback: '&onResize',
            resizableConfig: '=',
        },
        link: function postLink(scope, elem, attrs) {
            var resizableConfig = scope.resizableConfig;
            console.log("Resizable configuration:", resizableConfig);
            elem.resizable(resizableConfig);
            // elem.on('resizestop', function () {
            //     if (scope.callback) scope.callback();
            // });
        }
    };
});