storyApp.controller('Story', ['$scope', '$rootScope', 'Author', function($scope, $rootScope, Author) {
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
				image : "images/boats.jpg",
				headingDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				subheadingDetails : {
					text : "Animaliss peregrinatione!",
					color : "#54616A",
					size : "14px",
					alignment : "left"
				},
				descriptionDetails : {
					text : "Sunt byssuses experientia pius, flavum genetrixes. Varius, clemens paluss foris consumere de bi-color, salvus vortex.",
					color : "#000",
					size : "24px",
					alignment : "left"
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
				image : "images/bg-lake.jpg",
				heading : "New journey!",
				headingDetails : {
					text : "New journey!",
					color : "#000",
					size : "34px",
					alignment : "right"
				},
				subheadingDetails : {
					text : "Cum spatii velum, omnes elevatuses amor audax, varius imberes5",
					color : "#000",
					size : "24px",
					alignment : "right"
				},
				descriptionDetails : {
					text : "Advenas accelerare! Eheu, eleates! Pol. Frondators experimentum! Cum cotta persuadere, omnes ollaes manifestum camerarius, bi-color apolloniateses5",
					color : "#54616A",
					size : "14px",
					alignment : "right"
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
				image : "images/bg-glasses.jpg",
				heading : "Chiao!",
				headingDetails : {
					text : "Chiao!",
					color : "#54616A",
					size : "42px",
					alignment : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#54616A",
					size : "14px",
					alignment : "left"
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
				image : "images/bg-fields.jpg",
				heading : "Dali",
				headingDetails : {
					text : "Dali",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "14px",
					alignment : "left"
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
				image : "images/bg-bbq.jpg",
				heading : "Yum!",
				headingDetails : {
					text : "Yum!",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				subheadingDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "24px",
					alignment : "left"
				},
				descriptionDetails : {
					text : "China Trip 2015",
					color : "#000",
					size : "14px",
					alignment : "left"
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

}]);