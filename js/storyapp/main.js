
var siteStates = {
	"editing" : false
};

$(document).ready(function() {

	$("#globalEditControls").click(function() {
		toggleEditing();
	});

});

var toggleEditing = function() {
	console.log("Toggling the edit option", siteStates.editing);
	if((siteStates.editing == false) ? enableEditing() : disableEditing());
}

var enableEditing = function() {
	console.log("Enable editing!");

	$(".storyText__resizable").resizable();
	$(".storyText__resizable").resizable("enable");

	siteStates.editing = true;
	$("body").addClass("state__editing");
}

var disableEditing = function() {
	console.log("Disable editing!");

	$(".storyText__resizable").resizable("disable");

	siteStates.editing = false;
	$("body").removeClass("state__editing");
}