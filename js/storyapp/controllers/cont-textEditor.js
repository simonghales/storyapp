angular.module('storyApp').controller('TextEditor', ['$scope', '$rootScope', 'Editor', function($scope, $rootScope, Editor) {
    var textEditor = this;

    textEditor.states = {
        open : false
    }

    // get data

    textEditor.data = {
        styles: {
            color : "#000000",
            fontSize : "18px",
            textAlign : "left"
        }
    }

    textEditor.states = {
        dropdown_fontSize : false,
        dropdown_textAlign : false
    };

    textEditor.options = {
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

    $rootScope.$on('editor-display', function(event, value) {
        textEditor.data = Editor.getEditingItem();
        console.log("Text editor data", textEditor.data);
        textEditor.states.open = true;
    });

    textEditor.toggleDropdownFont = function() {
        textEditor.states.dropdown_fontSize = !textEditor.states.dropdown_fontSize
    }

    textEditor.toggleDropdownAlign = function() {
        textEditor.states.dropdown_textAlign = !textEditor.states.dropdown_textAlign
    }

    textEditor.selectOption = function(option, model, dropdown) {
        textEditor.data.styles[model] = option;
        textEditor.states[dropdown] = false;
    }

    textEditor.hide = function() {
        console.log("Hide the editor");
        Editor.hideEditor();
        textEditor.states.open = false;
    }

    // init colour picker?

}]);