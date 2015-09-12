storyApp.controller('Story', ['$scope', '$rootScope', 'Author', 'ngDialog', function($scope, $rootScope, Author, ngDialog) {
	// Avoid using $scope, use story = this instead
	var story = this;

	story.editing = Author.getEditing();
	$rootScope.$on('author-editingChanged', function(event, value) {
		story.editing = value;
	});

	// load story data
	story.data = {
		pages : [
			{
				id : "1",
				image : "images/boats.jpg",
				headingDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				subheadingDetails : {
					text : "Animaliss peregrinatione!",
					color : "#54616A",
					fontSize : "14px",
					textAlign : "left"
				},
				descriptionDetails : {
					text : "Sunt byssuses experientia pius, flavum genetrixes. Varius, clemens paluss foris consumere de bi-color, salvus vortex.",
					color : "#e27006",
					fontSize : "12px",
					textAlign : "left"
				},
				measurements : {
					containerWidth : "1024px",
					paddingVertical : "80px",
					paddingHorizontal : "40px",
					positionHorizontal : "right",
					positionVertical : "top",
					textWidth : "400px",
					textHeight : "300px"
				}
			},
			{
				id : "4334",
				image : "images/bg-lake.jpg",
				heading : "New journey!",
				headingDetails : {
					text : "New journey!",
					color : "#000",
					fontSize : "34px",
					textAlign : "right"
				},
				subheadingDetails : {
					text : "Cum spatii velum, omnes elevatuses amor audax, varius imberes5",
					color : "#000",
					fontSize : "24px",
					textAlign : "right"
				},
				descriptionDetails : {
					text : "Advenas accelerare! Eheu, eleates! Pol. Frondators experimentum! Cum cotta persuadere, omnes ollaes manifestum camerarius, bi-color apolloniateses5",
					color : "#54616A",
					fontSize : "14px",
					textAlign : "right"
				},
				measurements : {
					containerWidth : "820px",
					paddingVertical : "100px",
					paddingHorizontal : "20px",
					positionHorizontal : "left",
					positionVertical : "top",
					textWidth : "200px",
					textHeight : "500px"
				}
			},
			{
				id : "4545",
				image : "images/bg-glasses.jpg",
				heading : "Chiao!",
				headingDetails : {
					text : "Chiao!",
					color : "#54616A",
					fontSize : "42px",
					textAlign : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#54616A",
					fontSize : "14px",
					textAlign : "left"
				},
				subheading : "Yay",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : "1080px",
					paddingVertical : "40px",
					paddingHorizontal : "40px",
					positionHorizontal : "right",
					positionVertical : "bottom",
					textWidth : "700px",
					textHeight : "300px"
				}
			},
			{
				id : "2331",
				image : "images/bg-fields.jpg",
				heading : "Dali",
				headingDetails : {
					text : "Dali",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "14px",
					textAlign : "left"
				},
				subheading : "Woo",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : "1024px",
					paddingVertical : "80px",
					paddingHorizontal : "40px",
					positionHorizontal : "left",
					positionVertical : "top",
					textWidth : "100px",
					textHeight : "200px"
				}
			},
			{
				id : "6565",
				image : "images/bg-bbq.jpg",
				heading : "Yum!",
				headingDetails : {
					text : "Yum!",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "24px",
					textAlign : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#000",
					fontSize : "14px",
					textAlign : "left"
				},
				subheading : "Yeah",
				description : "The orange really masks the salmonella.",
				measurements : {
					containerWidth : "720px",
					paddingVertical : "120px",
					paddingHorizontal : "40px",
					positionHorizontal : "left",
					positionVertical : "top",
					textWidth : "400px",
					textHeight : "300px"
				}
			},
		]
	};

	story.toggleEditing = function() {
		Author.toggleEditing();
	}

	story.editorOptions = {
		cancel: ".__noDrag",
		containment: "window"
	}

	var generateDefaultPage = function() {
		var defaultPage = {
			image : "",
			backgroundColor : "#E0E0E0",
			headingDetails : {
				text : "",
				color : "#000",
				fontSize : "24px",
				textAlign : "left"
			},
			subheadingDetails : {
				text : "",
				color : "#000",
				fontSize : "22px",
				textAlign : "left"
			},
			descriptionDetails : {
				text : "",
				color : "#000",
				fontSize : "14px",
				textAlign : "left"
			},
			measurements : {
				containerWidth : "1024px",
				paddingVertical : "80px",
				paddingHorizontal : "120px",
				positionHorizontal : "left",
				positionVertical : "top",
				textWidth : "400px",
				textHeight : "300px"
			}
		};
		defaultPage.id = new Date().getUTCMilliseconds();
		return defaultPage;
	}

	story.addPage = function(index) {
		var defaultPage = generateDefaultPage();
		story.data.pages.splice(index + 1, 0, defaultPage);
		console.log("Add Page at index: " + index, story.data.pages);
	}

	story.removePage = function(index, page) {

		freezeSite();

		ngDialog.open({
			template: 'template-confirmation',
			className: 'yepDialog-theme-default',
			controller: 'Confirmation',
			controllerAs: 'confirmation',
			preCloseCallback: function(confirmed) {
				unfreezeSite();
				console.log("Pre closed conf?", confirmed);
				if(confirmed == true) {
					page.removeAnimation(function() {
						console.log("Removing page!");
						story.data.pages.splice(index, 1);
						$scope.$apply();
					});
				} else {
					console.log("Do nothing...");
				}
			}
		});

		//prompt({
		//	title: 'Delete this Thing?',
		//	message: 'Are you sure you want to do that?'
		//}).then(function(){
		//	story.data.pages.splice(index, 1);
		//});

	}

}]);