
var siteStates = {
	"editing" : false
};

$(document).ready(function() {

	$("#globalEditControls").click(function() {
		// toggleEditing();
	});

});

var toggleEditing = function() {
	console.log("Toggling the edit option", siteStates.editing);
	if((siteStates.editing == false) ? enableEditing() : disableEditing());
}

var enableEditing = function() {

	// Story Containers
	// $(".storyContainer__resizable").resizable({
	// 	handles: "e, w",
	// 	resize: function(event, ui) {
	// 		var newWidth = ui.originalSize.width+((ui.size.width - ui.originalSize.width)*2);
	//         $(this).width(newWidth).position({
	//             of: $(this).parent(),
	//             my: "center center",
	//             at: "center center"
	//         });
	//         $(this).css("left", "auto").css("right", "auto");
	//         // change to update max-width, not width
	//     }
	// });
	// $(".storyContainer__resizable").resizable("enable");

	// Story Content
	$(".storyContent__resizable").resizable({
		handles: "all",
		resize: function(event, ui) {
			var newWidth = ui.size.width += (ui.size.width - ui.originalSize.width);
			var newHeight = ui.size.height += (ui.size.height - ui.originalSize.height);
			var parentHeight = $(this).parent().height();
			var parentWidth = $(this).parent().width();

	        $(this).width("auto").height("auto").position({
	            of: $(this).parent(),
	            my: "center center",
	            at: "center center"
	        });

	        // calculate top offset
	        var horizontalOffset = (parentWidth - newWidth) / 2;
	        var verticalOffset = (parentHeight - newHeight) / 2;
	        if(horizontalOffset < 10) {
	        	horizontalOffset = 10;
	        }
	        if(verticalOffset < 10) {
	        	verticalOffset = 10;
	        };
	        ui.size.height = "auto";
	        ui.size.width = "auto";
	        $(this).css({
	        	"top" : verticalOffset, 
	        	"bottom" : verticalOffset, 
	        	"left" : horizontalOffset, 
	        	"right" : horizontalOffset
	        });
	    }
	});
	$(".storyContent__resizable").resizable("enable");

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
	// $(".storyContainer__resizable").resizable("disable");

	// Story Text Blocks
	$(".storyText__resizable").resizable("disable");

	siteStates.editing = false;
	$("body").removeClass("state__editing");
}