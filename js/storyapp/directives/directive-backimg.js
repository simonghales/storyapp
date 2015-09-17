angular.module('storyApp').directive('backImg', function() {
	return function(scope, element, attrs) {
		
		attrs.$observe('backImg', function () {
			setBackImg();
		});
		
		var setBackImg = function() {
			var url = attrs.backImg;
		
			if (url) {
				element.css({
					'background-image': 'url(' + url + ')'
				});
				element.removeClass("__noImage");
				element.addClass("__providedImage");
			} else {
				element.addClass("__noImage");
			}
		
		}
		
		setBackImg();
		
		
	};
});