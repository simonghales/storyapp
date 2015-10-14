
(function() {
    angular
        .module('app.story.controllers')
        .controller('TextEditorCTRL', TextEditorCTRL);

    TextEditorCTRL.$inject = ['$scope'];

    /* @ngInject */
    function TextEditorCTRL($scope) {
        /* jshint validthis: true */
        var vm = this;

        vm.states = {
            open : false // change back to false?
        }

        // get data

        vm.element = $scope.editingElement;

        vm.data = {
            styles: {
                color : "#000000",
                fontSize : "18px",
                textAlign : "left"
            }
        }

        vm.states = {
            dropdown_fontSize : false,
            dropdown_textAlign : false
        };

        vm.options = {
            fontSize : [
                "12px",
                "14px",
                "16px",
                "18px",
                "20px",
                "22px",
                "24px",
                "26px",
                "28px",
                "30px",
            ],
            textAlign : [
                "left",
                "right",
                "center"
            ]
        }

        vm.activate = activate;
        vm.toggleDropdownFont = toggleDropdownFont;
        vm.toggleDropdownAlign = toggleDropdownAlign;
        vm.selectOption = selectOption;
        vm.hide = hide;

        activate();

        ////////////////

        function activate() {

            $scope.$watch('visible', function() {
                vm.states.open = $scope.visible;
            });

            $scope.$watch('editingElement', function () {
                vm.element = $scope.editingElement;
            }, true);

            $scope.$watch('editingElement.color', function (newValue, oldValue) {
                if(oldValue && vm.states.open && newValue !== oldValue) { // check that the editor isn't just being initialised
                    $scope.pending();
                }
            }, true);

        }

        function toggleDropdownFont() {
            vm.states.dropdown_fontSize = !vm.states.dropdown_fontSize
        }

        function toggleDropdownAlign() {
            vm.states.dropdown_textAlign = !vm.states.dropdown_textAlign
        }

        function selectOption(option, model, dropdown) {
            vm.element[model] = option;
            vm.states[dropdown] = false;
            $scope.pending();
        }

        function hide() {
            console.log("Hide the editor");
            //Editor.hideEditor();
            $scope.editingElement = null;
            vm.element = null;
            vm.states.open = false;
            $scope.visible = false;
        }

    }
})();