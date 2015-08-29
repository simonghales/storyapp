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
				heading : "China Trip 2015",
				subheading : "China and Hong Kong",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ea aliquam, earum recusandae similique! Repellendus temporibus beatae velit, a amet ullam inventore libero veritatis distinctio rem voluptatum consequuntur voluptate facere.",
				measurements : {
					containerWidth : "1024px",
					paddingVertical : "80px",
					paddingHorizontal : "40px"
				}
			},
			{
				image : "images/bg-lake.jpg",
				heading : "New journey!",
				subheading : "Yay",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum voluptas perferendis unde, corporis nulla odit. Repellendus iusto nam pariatur, temporibus soluta dolore molestias quis accusantium eum quae quo fuga assumenda!",
				measurements : {
					containerWidth : "820px",
					paddingVertical : "20px",
					paddingHorizontal : "20px"
				}
			},
			{
				image : "images/bg-glasses.jpg",
				heading : "Chiao!",
				subheading : "Yay",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : "1280px",
					paddingVertical : "40px",
					paddingHorizontal : "40px"
				}
			},
			{
				image : "images/simon.jpg",
				heading : "Simon!",
				subheading : "Woo",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : "1024px",
					paddingVertical : "80px",
					paddingHorizontal : "40px"
				}
			},
			{
				image : "images/bg-us.jpg",
				heading : "We!",
				subheading : "Yeah",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : "720px",
					paddingVertical : "120px",
					paddingHorizontal : "40px"
				}
			},
		]
	};

	story.toggleEditing = function() {
		Author.toggleEditing();
	}

}]);