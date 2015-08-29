storyApp.controller('Page', function($scope, $log) {
	var page = this;
	page.data = $scope.storyPage;

	page.elementWidth = 1000;

	page.resizableContainer = {
		configuration : {
			handles : "w, e",
			resize : function(event, ui) {
				console.log("EXECUTING RESIZE FUNCTION");
				var newWidth = ui.originalSize.width+((ui.size.width - ui.originalSize.width)*2);
		        $(this).width("auto").position({
		            of: $(this).parent(),
		            my: "center center",
		            at: "center center"
		        });
		        $(this).css({
		        	"left" : "auto",
		        	"right" : "auto",
		        	"width" : "auto",
		        	"max-width" : newWidth
		        });
		    },
		    stop : function(event, ui) {
		    	page.elementWidth = ui.size.width;
		    	$scope.$apply();
		    }
		}
	}

	page.initDimensions = function() {
		// set up width
		// set up padding
	}

});