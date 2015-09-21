angular
	.module('storyApp')
	.controller('PageCTRL', PageCTRL)

.$inject = ['$scope', '$rootScope', '$element', '$log', 'Author', 'Editor', 'ngDialog', 'PageData', 'StoryService'];

/* @ngInject */
function PageCTRL($scope, $rootScope, $element, $log, Author, Editor, ngDialog, PageData, StoryService) {
	/* jshint validthis: true */
	var vm = this;
	vm.data;
	vm.states = {
		pendingChanges: false,
		busyCount: 0
	}

	vm.activate = activate;
	vm.pendingChange = pendingChange;
	vm.saveChanges = saveChanges;
	vm.CreateElementGroup = CreateElementGroup;
	vm.AddElement = AddElement;
	vm.elementUpdated = elementUpdated;
	vm.initDimensions = initDimensions;
	vm.updateMeasurements = updateMeasurements;
	vm.setPageCSS = setPageCSS;
	vm.setContentCSS = setContentCSS;
	vm.setTextDimensions = setTextDimensions;
	vm.setPositionClasses = setPositionClasses;
	vm.changeDirection = changeDirection;
	vm.setHeadingStyles = setHeadingStyles;
	vm.setSubheadingStyles = setSubheadingStyles;
	vm.setDescriptionStyles = setDescriptionStyles;
	vm.openEditor = openEditor;
	vm.updateImageModal = updateImageModal;
	vm.updateImage = updateImage;
	vm.removeAnimation = removeAnimation;

	activate();

	// Variable Settings //

	vm.dimensions = {
		containerWidth : "",
		paddingVertical : "",
		paddingHorizontal : ""
	}

	vm.resizableContainer = {
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
				vm.safeData.measurements.containerWidth = ui.size.width;
				vm.updateMeasurements();
				$scope.$apply();
			}
		}
	};

	vm.resizableContent = {
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
				vm.safeData.measurements.paddingHorizontal = horizontalOffset;
				vm.safeData.measurements.paddingVertical = verticalOffset;
				vm.updateMeasurements();
				console.log("Final", verticalOffset, horizontalOffset);
				$scope.$apply();
			}
		}
	};

	vm.resizableText = {
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

	// END Variable Settings //

	////////////////

	function activate() {
		vm.data = $scope.storyPage;
		vm.safeData = PageData.GetSafeData(vm.data);

		$scope.$on('$destroy', function () {
			console.log("Destroy this page and unsubscribe!!");
			saveChangesListener();
		});

		var saveChangesListener = $rootScope.$on('story-saveChanges', function() {
			vm.saveChanges();
		});

		if(vm.data.defaultTemplate) {
			console.log("This page was just added, I need to get an ID for it!");
			StoryService.CreatePage(vm.data, vm.data.story)
				.then(function(data) {
					if(data.success == false) {
						console.log("Error with creating page", data);
					} else {
						console.log("Created page", data);
						vm.data.id = data.data.id;
						//vm.CreateElementGroup();
					}
				}, function(error) {
					console.log("Error: " + error);
				});
		} else {

			//if(vm.data.element_groups.length == 0) {
			//	vm.CreateElementGroup();
			//}

		}

	}

	function pendingChange() {
		vm.states.pendingChanges = true;
		$rootScope.$broadcast('page-update-pending', vm.data.id);
	}

	function saveChanges() {
		console.log("Update this page", vm.data, this, $scope);
		if(!vm.states.pendingChanges) {
			$rootScope.$broadcast('page-update-success', vm.data.id);
			return;
		}
		vm.updateMeasurements();
		StoryService.UpdatePageData(vm.data, vm.data.id).then(function(data) {
			console.log("Update page data", data);
			if(data.success == false) {
				$rootScope.$broadcast('page-update-error', vm.data.id);
			} else {
				$rootScope.$broadcast('page-update-success', vm.data.id);
			}
		}, function(error) {
			$rootScope.$broadcast('page-update-error', vm.data.id);
			console.log("Error: " + error);
		});
	}

	function CreateElementGroup() {
		vm.states.busyCount++;
		var elementGroup = {
			page: vm.data.id,
			style: ""
		}
		elementGroup = JSON.stringify(elementGroup);
		StoryService.CreateElementGroup(elementGroup).then(function(data) {
			console.log("Created element group", data);
			if(data.success == false) {
				console.log("Error: Failed to create element group");
			} else {
				console.log("Successfully created element group");
				vm.data.element_groups.push(data.data);
				vm.AddElement(data.data.id);
			}
			vm.states.busyCount--;
		}, function(error) {
			vm.states.busyCount--;
			console.log("Error: " + error);
		});
	}

	function AddElement(groupId) {
		var element = {
			group : groupId,
			text : "",
			type : "heading",
			style : ""
		}
		element = JSON.stringify(element);
		vm.states.busyCount++;
		StoryService.CreateElement(element).then(function(data) {
			console.log("Created element", data);
			if(data.success == false) {
				console.log("Error: Failed to create element");
			} else {
				console.log("Successfully created element");
				vm.data.element_groups[0].elements.push(data.data);
			}
			vm.states.busyCount--;
		}, function(error) {
			vm.states.busyCount--;
			console.log("Error: " + error);
		});
	}

	function elementUpdated() {
		vm.pendingChange();
	}

	function initDimensions() {
		// set up width
		// set up padding
	}

	function updateMeasurements() {
		// convert safe data back to thingy data
		var updatedMeasurements = JSON.stringify(vm.safeData.measurements);
		vm.data.measurements = updatedMeasurements;
		vm.pendingChange();
		console.log("Safe data", updatedMeasurements, vm.safeData);
	}

	function setPageCSS() {
		var cssStyles = {};
		if(vm.data.backgroundColor) {
			cssStyles["background-color"] = vm.data.backgroundColor;
		}
		return cssStyles;
	}

	function setContentCSS() {
		return {
			top : vm.safeData.measurements.paddingVertical,
			bottom : vm.safeData.measurements.paddingVertical,
			left : vm.safeData.measurements.paddingHorizontal,
			right : vm.safeData.measurements.paddingHorizontal,
		}
	}

	function setTextDimensions() {
		return {
			width : vm.safeData.measurements.textWidth,
			height : vm.safeData.measurements.textHeight
		};
	}

	function setPositionClasses() {
		var classes = "";
		if(vm.safeData.measurements.positionVertical == 'top') {
			classes += " position__top";
		} else {
			classes += " position__bottom";
		}
		if(vm.safeData.measurements.positionHorizontal == 'left') {
			classes += " position__left";
		} else {
			classes += " position__right";
		}
		return classes;
	}

	function changeDirection(newDirection, type) {
		if(type == "horizontal") {
			vm.safeData.measurements.positionHorizontal = newDirection;
		} else {
			vm.safeData.measurements.positionVertical = newDirection;
		}
	}

	function setHeadingStyles() {
		return {
			//"font-size" : vm.data.headingDetails.fontSize,
			//"color" : vm.data.headingDetails.color,
			//"text-align" : vm.data.headingDetails.textAlign
		}
	}

	function setSubheadingStyles() {
		return {
			//"font-size" : vm.data.subheadingDetails.fontSize,
			//"color" : vm.data.subheadingDetails.color,
			//"text-align" : vm.data.subheadingDetails.textAlign
		}
	}

	function setDescriptionStyles() {
		return {
			//"font-size" : vm.data.descriptionDetails.fontSize,
			//"color" : vm.data.descriptionDetails.color,
			//"text-align" : vm.data.descriptionDetails.textAlign
		}
	}

	function openEditor(item, $event) {
		var offset = {
			x : $event.pageX,
			y : $event.pageY
		}
		console.log("Event returned", $event);
		Editor.setEditingItem(item, offset);
	}

	function updateImageModal() {

		freezeSite();
		ngDialog.open({
			template: 'js/storyapp/image/_imageUpload.html',
			className: 'yepDialog-theme-default',
			controller: 'ImageUpload',
			controllerAs: 'imageUpload',
			preCloseCallback: function(newImage) {
				unfreezeSite();
				if(newImage && newImage.id) {
					vm.updateImage(newImage);
				}
			}
		});

	}

	function updateImage(newImage) {
		//console.log("Update this page's bg info with: ", newImage, vm.data);
		vm.data.background_image_urls[0] = newImage;
		vm.data.background_images[0] = newImage.id;
		vm.pendingChange();
		//console.log("Updated bg", vm.data.background_image_urls[0].remote_url);
	}

	function removeAnimation(callback) {
		console.log("Removing this page!");
		StoryService.DeletePage(vm.data.id).then(function(data) {
			console.log("Delete page data", data);
			if(data.success == false) {
				console.log("Error, failed to delete page");
			} else {
				console.log("Deleted page!");
			}
		}, function(error) {
			console.log("Error: " + error);
		});
		var domElement = $($element);
		domElement.parent().slideUp(300, function() {
			callback();
		});
	}


}
