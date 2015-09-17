angular.module('storyApp').factory('Author', ['$rootScope', function($rootScope){

	var authorData = {
		editing : false,
	};

	return {
		toggleEditing : function() {
			authorData.editing = !authorData.editing;
			$rootScope.$broadcast('author-editingChanged', authorData.editing);
		},
		getEditing : function() {
			return authorData.editing;
		}
	}

}]);