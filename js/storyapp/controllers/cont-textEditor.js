storyApp.controller('TextEditor', ['$scope', function($scope) {
    var textEditor = this;

    // get data

    textEditor.data = {
        color : "#000000",
        fontSize : "18px",
        textAlign : "left"
    }

    textEditor.states = {
        dropdown_fontSize : false,
        dropdown_textAlign : false
    };

    textEditor.toggleDropdownFont = function() {
        textEditor.states.dropdown_fontSize = !textEditor.states.dropdown_fontSize
    }

    textEditor.toggleDropdownAlign = function() {
        textEditor.states.dropdown_textAlign = !textEditor.states.dropdown_textAlign
    }

    // init colour picker?

}]);