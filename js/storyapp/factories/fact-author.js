angular.module('storyApp').factory('Author', ['$rootScope', function($rootScope){

	var authorData = {
		editing : false,
	};

	return {
		toggleEditing : function(statusBool) {
			if (statusBool) {
				authorData.editing = statusBool;
			} else {
				authorData.editing = !authorData.editing;
			}
			$rootScope.$broadcast('author-editingChanged', authorData.editing);
		},
		getEditing : function() {
			return authorData.editing;
		}
	}

}]);