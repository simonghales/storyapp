storyApp.controller('Page', ['$scope', '$element', '$log', 'Author', 'Editor', 'ngDialog', 'PageData', function($scope, $element, $log, Author, Editor, ngDialog, PageData) {
	var page = this;
	page.data = $scope.storyPage;

	page.safeData = PageData.GetSafeData(page.data);

	console.log("Safe data is:", page.safeData);

	page.dimensions = {
		containerWidth : "",
		paddingVertical : "",
		paddingHorizontal : ""
	}

	page.resizableContainer = {
		configuration : {
			handles : "w, e",
			resize : function(event, ui) {
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
				ui.size.width = newWidth;
				//console.log("EXECUTING RESIZE FUNCTION", newWidth);
		    },
		    stop : function(event, ui) {
				//console.log("Finished resizing", ui.size.width);
		    	page.safeData.measurements.containerWidth = ui.size.width;
		    	$scope.$apply();
		    }
		}
	};

	page.resizableContent = {
		configuration : {
			handles: "all",
			resize: function(event, ui) {

				var parentHeight = $(this).parent().height();
				var parentWidth = $(this).parent().width();

				$(this).width("auto").height("auto").position({
					of: $(this).parent(),
					my: "center center",
					at: "center center"
				});

				var horizontalOffset = $(this).css("left");
				var verticalOffset = $(this).css("top");

				console.log("Original offsets", horizontalOffset, verticalOffset);

				if(isNaN(ui.size.width) || ui.size.width == ui.originalSize.width) {
					var newWidth = ui.originalSize.width;
				} else {
					var newWidth = ui.size.width + (ui.size.width - ui.originalSize.width) / 2;
					var horizontalOffset = (parentWidth - newWidth) / 2;
					console.log("Fixed up horizontal offset", horizontalOffset, newWidth, ui.size.width, ui.originalSize.width);
				}
				if(isNaN(ui.size.height) || ui.size.height == ui.originalSize.height) {
					var newHeight = ui.originalSize.height;
				} else {
					var newHeight = ui.size.height + (ui.size.height - ui.originalSize.height) / 2;
					var verticalOffset = (parentHeight - newHeight) / 2;
					console.log("Fixed up vertical offset", verticalOffset, newHeight, ui.size.height, ui.originalSize.height);
				}

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
				ui.size.verticalOffset = verticalOffset;
				ui.size.horizontalOffset = horizontalOffset;
				console.log("Resized", verticalOffset, horizontalOffset);
		    },
		    stop : function(event, ui) {
				//var parentHeight = $(this).parent().height();
				//var parentWidth = $(this).parent().width();
				//var horizontalOffset = (parentWidth - ui.size.widthTemp) / 2;
				//var verticalOffset = (parentHeight - ui.size.heightTemp) / 2;
				var verticalOffset = ui.size.verticalOffset;
				var horizontalOffset = ui.size.horizontalOffset;
		    	page.safeData.measurements.paddingHorizontal = horizontalOffset;
		    	page.safeData.measurements.paddingVertical = verticalOffset;
				console.log("Final", verticalOffset, horizontalOffset);
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
		    	
		    	// TODO: update relevant details
		    	
		    	$scope.$apply();
		    }
		}
	}

	page.initDimensions = function() {
		// set up width
		// set up padding
	}

	page.setPageCSS = function() {
		var cssStyles = {};
		if(page.data.backgroundColor) {
			cssStyles["background-color"] = page.data.backgroundColor;
		}
		return cssStyles;
	}

	page.setContentCSS = function() {
		return {
			top : page.safeData.measurements.paddingVertical,
			bottom : page.safeData.measurements.paddingVertical,
			left : page.safeData.measurements.paddingHorizontal,
			right : page.safeData.measurements.paddingHorizontal,
		}
	}

	page.setTextDimensions = function() {
		return {
			width : page.safeData.measurements.textWidth,
			height : page.safeData.measurements.textHeight
		};
	}

	page.setPositionClasses = function() {
		var classes = "";
		if(page.safeData.measurements.positionVertical == 'top') {
			classes += " position__top";
		} else {
			classes += " position__bottom";
		}
		if(page.safeData.measurements.positionHorizontal == 'left') {
			classes += " position__left";
		} else {
			classes += " position__right";
		}
		return classes;
	}

	page.changeDirection = function(newDirection, type) {
		if(type == "horizontal") {
			page.safeData.measurements.positionHorizontal = newDirection;
		} else {
			page.safeData.measurements.positionVertical = newDirection;
		}
	}

	page.setHeadingStyles = function() {
		return {
			//"font-size" : page.data.headingDetails.fontSize,
			//"color" : page.data.headingDetails.color,
			//"text-align" : page.data.headingDetails.textAlign
		}
	}

	page.setSubheadingStyles = function() {
		return {
			//"font-size" : page.data.subheadingDetails.fontSize,
			//"color" : page.data.subheadingDetails.color,
			//"text-align" : page.data.subheadingDetails.textAlign
		}
	}

	page.setDescriptionStyles = function() {
		return {
			//"font-size" : page.data.descriptionDetails.fontSize,
			//"color" : page.data.descriptionDetails.color,
			//"text-align" : page.data.descriptionDetails.textAlign
		}
	}

	page.openEditor = function(item, $event) {
		var offset = {
			x : $event.pageX,
			y : $event.pageY
		}
		console.log("Event returned", $event);
		Editor.setEditingItem(item, offset);
	}

	page.updateImage = function() {

		freezeSite();
		ngDialog.open({
			template: 'template-backgroundHandler',
			className: 'yepDialog-theme-default',
			controller: 'Confirmation',
			controllerAs: 'confirmation',
			preCloseCallback: function() {
				unfreezeSite();
			}
		});

	}

	page.removeAnimation = function(callback) {
		console.log("Removing this page!");
		var domElement = $($element);
		domElement.parent().slideUp(300, function() {
			callback();
		});
	}

}]);