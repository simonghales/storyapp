storyApp.controller('Story', function($scope) {
	// Avoid using $scope, use story = this instead
	var story = this;

	// load story data
	story.data = {
		pages : [
			{
				image : "images/boats.jpg",
				heading : "China Trip 2015",
				subheading : "China and Hong Kong",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ea aliquam, earum recusandae similique! Repellendus temporibus beatae velit, a amet ullam inventore libero veritatis distinctio rem voluptatum consequuntur voluptate facere.",
				measurements : {
					containerWidth : 1024,
					paddingVertical : 80,
					paddingHorizontal : 40
				}
			},
			{
				image : "images/bg-lake.jpg",
				heading : "New journey!",
				subheading : "Yay",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum voluptas perferendis unde, corporis nulla odit. Repellendus iusto nam pariatur, temporibus soluta dolore molestias quis accusantium eum quae quo fuga assumenda!",
				measurements : {
					containerWidth : 960,
					paddingVertical : 80,
					paddingHorizontal : 40
				}
			},
			{
				image : "images/chiao.jpg",
				heading : "Chiao!",
				subheading : "Yay",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : 1280,
					paddingVertical : 40,
					paddingHorizontal : 40
				}
			},
			{
				image : "images/simon.jpg",
				heading : "Simon!",
				subheading : "Woo",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : 1024,
					paddingVertical : 80,
					paddingHorizontal : 40
				}
			},
			{
				image : "images/beachUs.jpg",
				heading : "We!",
				subheading : "Yeah",
				description : "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
				measurements : {
					containerWidth : 720,
					paddingVertical : 120,
					paddingHorizontal : 40
				}
			},
		]
	};

});