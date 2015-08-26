
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

	// Story Containers
	$(".storyContainer__resizable").resizable({
		// maxWidth: "100%", get width of screen?
		// containment: "parent",
		handles: "e, w",
		resize: function(event, ui) {
			var newWidth = ui.originalSize.width+((ui.size.width - ui.originalSize.width)*2);
	        $(this).width(newWidth).position({
	            of: $(this).parent(),
	            my: "center center",
	            at: "center center"
	        });
	        $(this).css("left", "auto").css("right", "auto");
	        // ui.size.width += (ui.size.width - ui.originalSize.width);
	        //not knowing how you center your stuff i do it the jquery-ui way can be left out
	        // $(this).position({
	        //     of: $(this).parent(),
	        //     my: "center center",
	        //     at: "center center"
	        // })
	    }
	});
	$(".storyContainer__resizable").resizable("enable");

	// Story Text Blocks
	$(".storyText__resizable").resizable({
		containment: "parent",
	});
	$(".storyText__resizable").resizable("enable");

	siteStates.editing = true;
	$("body").addClass("state__editing");
}

var disableEditing = function() {

	// Story Containers
	$(".storyContainer__resizable").resizable("disable");

	// Story Text Blocks
	$(".storyText__resizable").resizable("disable");

	siteStates.editing = false;
	$("body").removeClass("state__editing");
}