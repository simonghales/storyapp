storyApp.controller('Page', ['$scope', '$log', 'Author', function($scope, $log, Author) {
	var page = this;
	page.data = $scope.storyPage;

	page.dimensions = {
		containerWidth : "",
		paddingVertical : "",
		paddingHorizontal : ""
	}

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
		    	page.dimensions.containerWidth = ui.size.width;
		    	$scope.$apply();
		    }
		}
	};

	page.resizableContent = {
		configuration : {
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
		    },
		    stop : function(event, ui) {
		    	var parentHeight = $(this).parent().height();
				var parentWidth = $(this).parent().width();
				var horizontalOffset = (parentWidth - ui.size.width) / 2;
		        var verticalOffset = (parentHeight - ui.size.height) / 2;
		    	page.dimensions.paddingHorizontal = horizontalOffset;
		    	page.dimensions.paddingVertical = verticalOffset;
		    	$scope.$apply();
		    }
		}
	};

	page.resizableText = {
		configuration : {
			handles : "all",
			// containment : "parent",
			resize: function(event, ui) {
				$(this).css({
		        	"top" : "", 
		        	"bottom" : "", 
		        	"left" : "", 
		        	"right" : ""
		        });
		    },
			stop : function(event, ui) {
		    	
		    	// update relevant details
		    	
		    	$scope.$apply();
		    }
		}
	}

	page.initDimensions = function() {
		// set up width
		// set up padding
	}

	page.setContentCSS = function() {
		return {
			top : page.data.measurements.paddingVertical,
			bottom : page.data.measurements.paddingVertical,
			left : page.data.measurements.paddingHorizontal,
			right : page.data.measurements.paddingHorizontal,
		}
	}

	page.setTextDimensions = function() {
		return {
			width : page.data.measurements.textWidth,
			height : page.data.measurements.textHeight
		};
	}

	page.setPositionClasses = function() {
		var classes = "";
		if(page.data.measurements.positionVertical == 'top') {
			classes += " position__top";
		} else {
			classes += " position__bottom";
		}
		if(page.data.measurements.positionHorizontal == 'left') {
			classes += " position__left";
		} else {
			classes += " position__right";
		}
		return classes;
	}

	page.changeDirection = function(newDirection, type) {
		if(type == "horizontal") {
			page.data.measurements.positionHorizontal = newDirection;
		} else {
			page.data.measurements.positionVertical = newDirection;
		}
	}

}]);