storyApp.controller('StoriesList', ['$scope', 'StoryService', function($scope, StoryService) {

    var storiesList = this;
    storiesList.data = {};
    storiesList.states = {
        loading : true
    }

    storiesList.LoadStories = function() {
        storiesList.states.loading = true;
        StoryService.GetAll()
            .then(function(data) {
                console.log("Loaded all stories!", data);
                storiesList.data = data;
                storiesList.states.loading = false;
            }, function(error) {
                console.log("Error: " + error);
            });
    }

    storiesList.LoadStories();

}]);

