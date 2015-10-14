
/**
 * textEditor
 * @namespace app.story.directives
 */
(function () {
    'use strict';

    angular
        .module('app.story.directives')
        .directive('textEditor', textEditor);

    /**
     * @namespace textEditor
     */
    function textEditor() {

        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf app.story.directives.textEditor
         */
        var directive = {
            restrict: 'E',
            controller: 'TextEditorCTRL',
            controllerAs: 'textEditor',
            templateUrl: 'partials/story/_storyTextEditor.html',
            scope: {
                visible: "=",
                pending: "=",
                editingElement: "=",
                offset: "=",
                //textElement: "=",
            }
        };

        directive.link = function(scope, element, attributes) {

            console.log("Text editor", scope);

            var width = element.width();
            var topOffset = scope.offset.y + 15;
            var leftOffset = scope.offset.x - width - 15;

            if(topOffset < 10) {
                topOffset = 10;
            }

            if(leftOffset < 10) {
                leftOffset = 10;
            }

            element.css({
                top : topOffset + "px",
                left : leftOffset + "px"
            });

            scope.$watch('visible', function (newValue, oldValue) {
                console.log("Visible changed", scope.visible, newValue);
                _checkVisibility();
            }, true);

            _checkVisibility();

            function _checkVisibility() {
                if(scope.visible) {
                    element.show();
                } else {
                    element.hide();
                }
            }

            //$rootScope.$on('editor-display', function(event, value) {
            //    var offset = value;
            //    var width = element.width();
            //    var topOffset = offset.y;
            //    var leftOffset = offset.x - width - 15;
            //
            //    if(topOffset < 10) {
            //        topOffset = 10;
            //    }
            //
            //    if(leftOffset < 10) {
            //        leftOffset = 10;
            //    }
            //
            //    element.css({
            //        top : topOffset + "px",
            //        left : leftOffset + "px"
            //    });
            //    element.show();
            //});
            //
            //$rootScope.$on('editor-hide', function(event, value) {
            //    element.hide();
            //});
            //
            //element.hide();

        }

        return directive;

    }

})();


//angular.module('app.story.directives').directive('textEditor', ['$rootScope', 'Editor', function($rootScope, Editor) {
//
//    var directive = {};
//
//    directive.restrict = 'E'; /* restrict this directive to elements */
//    directive.templateUrl = "partials/_textEditor.html";
//
//    directive.link = function(scope, element, attributes) {
//
//
//        $rootScope.$on('editor-display', function(event, value) {
//            var offset = value;
//            var width = element.width();
//            var topOffset = offset.y;
//            var leftOffset = offset.x - width - 15;
//
//            if(topOffset < 10) {
//                topOffset = 10;
//            }
//
//            if(leftOffset < 10) {
//                leftOffset = 10;
//            }
//
//            element.css({
//                top : topOffset + "px",
//                left : leftOffset + "px"
//            });
//            element.show();
//        });
//
//        $rootScope.$on('editor-hide', function(event, value) {
//            element.hide();
//        });
//
//        element.hide();
//
//    }
//
//    return directive;
//}]);