storyApp.controller('Page', function($scope, $log) {
	var page = this;
	page.data = $scope.storyPage;
	$log.debug("pageData", page.data);
	$log.debug("page", page);
});