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
			defaultTemplate : true,
			story: vm.id,
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
	vm.storySettings = storySettings;
	vm.removePage = removePage;

	activate();

	////////////////

	function activate() {
		vm.id = $stateParams.id;
		vm.LoadStory();

		$scope.$on('$destroy', function () {
			console.log("Destroy this story and unsubscribe!!");
			updatePendingListener();
			updateSuccessListener();
			updateErrorListener();
		});

		var updatePendingListener = $rootScope.$on('page-update-pending', function(event, pageId) {
			vm.states.pendingChanges = true;
		});

		var updateSuccessListener = $rootScope.$on('page-update-success', function(event, pageId) {
			pagesToBeSaved--;
			if(pagesToBeSaved == 0) {
				vm.states.saving = false;
				vm.states.pendingChanges = false;
				vm.storeStory();
				console.log("Finished updating story!");
			}
			console.log("Page updated", pageId, pagesToBeSaved);
		});

		var updateErrorListener = $rootScope.$on('page-update-error', function(event, pageId) {
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
			if(vm.data.data.pages.length == 0) {
				vm.addPage(0);
			}
			Author.toggleEditing(true);
		}
		if($rootScope.states.admin) {
			vm.states.owner = true;
			if(vm.data.data.pages.length == 0) {
				vm.addPage(0);
			}
			Author.toggleEditing(true);
		}
	}

	function LoadStory() {
		vm.states.loading = true;
		vm.states.loaded = false;
		StoryService.GetById(vm.id)
			.then(function(data) {
				console.log("Successfully loaded story data", data);
				// Get rid of deleted pages
				for(var i = 0; i < data.data.pages.length; i++) {
					if(data.data.pages[i].deleted) {
						data.data.pages.splice(i, 1);
						i--;
					}
				}
				vm.data = data;
				vm.PrepStory();
				vm.states.loaded = true;
				vm.states.loading = false;
				vm.storeStory();
			}, function(error) {
				console.log("Error: " + error);
				vm.states.error = true;
				vm.states.loaded = true;
				vm.states.loading = false;
			})
	}

	function storeStory() {
		console.log("Storing story!", vm.data);
		angular.copy(vm.data, vm.preservedData);
		console.log("Preserved data", vm.data.data.pages[0].measurements, vm.preservedData.data.pages[0].measurements);
	}

	function saveChanges() {
		vm.states.saving = true;
		pagesToBeSaved = vm.data.data.pages.length;
		//vm.storeStory();
		$rootScope.$broadcast('story-saveChanges');
		console.log("Number of pages to be saved", pagesToBeSaved);
		// vm.states.saving = false;
	}

	function cancelChanges() {
		if(!vm.states.pendingChanges) {
			return;
		}
		console.log("Cancel changes!", vm.data, vm.preservedData);
		//vm.data = angular.copy(vm.preservedData);
		vm.data = {};
		$timeout(function() {
			vm.data = angular.copy(vm.preservedData);
			vm.states.pendingChanges = false;
		});
		//vm.data = vm.preservedData;
		console.log("Story data", vm.data);
	}

	function addPage(index) {
		var defaultPage = generateDefaultPage();
		vm.data.data.pages.splice(index + 1, 0, defaultPage);
		console.log("Add Page at index: " + index, vm.data.data.pages);
	}

	function storySettings() {
		freezeSite();

		ngDialog.open({
			template: 'js/storyapp/stories/_settings.html',
			className: 'yepDialog-theme-default',
			controller: 'SettingsCTRL',
			controllerAs: 'settings',
			data: {
				id: vm.id
			},
			preCloseCallback: function() {
				unfreezeSite();
			}
		});
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