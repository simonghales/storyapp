angular
	.module('storyApp')
	.controller('StoryCTRL', StoryCTRL)

.$inject = ['$scope', '$rootScope', '$timeout', '$stateParams', 'Author', 'ngDialog', 'StoryService'];

/* @ngInject */
function StoryCTRL($scope, $rootScope, $timeout, $stateParams, Author, ngDialog, StoryService) {
	/* jshint validthis: true */
	var vm = this;

	vm.states = {
		loaded : false,
		loading : true,
		error : false,
		owner : false,
		pendingChanges : false,
		saving : false,
		savingError : false
	}
	vm.data = {};
	vm.preservedData = {};
	vm.id;
	vm.editorOptions = {
		cancel: ".__noDrag",
		containment: "window"
	}

	var pagesToBeSaved = 0;

	var generateDefaultPage = function() {
		var defaultPage = {
			background_images : [],
			background_image_urls : [],
			measurements : "[]",
			background_colour : "#E0E0E0",
			element_groups : []
			//measurements : {
			//	containerWidth : "1024px",
			//	paddingVertical : "80px",
			//	paddingHorizontal : "120px",
			//	positionHorizontal : "left",
			//	positionVertical : "top",
			//	textWidth : "400px",
			//	textHeight : "300px"
			//}
		};
		defaultPage.id = new Date().getUTCMilliseconds();
		return defaultPage;
	}

	vm.activate = activate;
	vm.PrepStory = PrepStory;
	vm.LoadStory = LoadStory;
	vm.storeStory = storeStory;
	vm.saveChanges = saveChanges;
	vm.cancelChanges = cancelChanges;
	vm.addPage = addPage;
	vm.removePage = removePage;

	activate();

	////////////////

	function activate() {
		vm.id = $stateParams.id;
		vm.LoadStory();

		$rootScope.$on('page-update-pending', function(event, pageId) {
			vm.states.pendingChanges = true;
		});

		$rootScope.$on('page-update-success', function(event, pageId) {
			pagesToBeSaved--;
			if(pagesToBeSaved == 0) {
				vm.states.saving = false;
				vm.states.pendingChanges = false;
			}
			console.log("Page updated", pageId, pagesToBeSaved);
		});

		$rootScope.$on('page-update-error', function(event, pageId) {
			pagesToBeSaved--;
			if(pagesToBeSaved == 0) {
				vm.states.saving = false;
				vm.states.pendingChanges = false;
			}
			vm.states.savingError = true;
			console.log("Page failed to update", pageId, pagesToBeSaved);
		});

	}

	function PrepStory() {
		if($rootScope.states.loggedIn &&
			vm.data.data.author.username == $rootScope.globals.currentUser.username) {
			vm.states.owner = true;
			Author.toggleEditing(true);
		}
		if($rootScope.states.admin) {
			vm.states.owner = true;
			Author.toggleEditing(true);
		}
	}

	function LoadStory() {
		vm.states.loading = true;
		vm.states.loaded = false;
		StoryService.GetById(vm.id)
			.then(function(data) {
				vm.data = data;
				vm.storeStory();
				vm.PrepStory();
				vm.states.loaded = true;
				vm.states.loading = false;
				console.log("Successfully loaded story data", data);
			}, function(error) {
				console.log("Error: " + error);
				vm.states.error = true;
				vm.states.loaded = true;
				vm.states.loading = false;
			})
	}

	function storeStory() {
		vm.preservedData = angular.copy(vm.data);
	}

	function saveChanges() {
		vm.states.saving = true;
		pagesToBeSaved = vm.data.data.pages.length;
		vm.storeStory();
		$rootScope.$broadcast('story-saveChanges');
		console.log("Number of pages to be saved", pagesToBeSaved);
		// vm.states.saving = false;
	}

	function cancelChanges() {
		console.log("Cancel changes!", vm.data, vm.preservedData);
		//vm.data = angular.copy(vm.preservedData);
		vm.data = {};
		$timeout(function() {
			vm.data = vm.preservedData;
		});
		//vm.data = vm.preservedData;
		console.log("Story data", vm.data);
	}

	function addPage(index) {
		var defaultPage = generateDefaultPage();
		vm.data.data.pages.splice(index + 1, 0, defaultPage);
		console.log("Add Page at index: " + index, vm.data.data.pages);
	}

	function removePage(index, page) {

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
						vm.data.data.pages.splice(index, 1);
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
		//	vm.data.pages.splice(index, 1);
		//});

	}


}