angular.module('storyApp').controller('StoriesList', ['$scope', 'StoryService', function($scope, StoryService) {

    var storiesList = this;
    storiesList.data = {};
    storiesList.dataRows;
    storiesList.states = {
        loading : true
    }

    storiesList.LoadStories = function() {
        storiesList.states.loading = true;
        StoryService.GetAll()
            .then(function(data) {
                console.log("Loaded all stories!", data);
                storiesList.data = data;
                storiesList.dataRows = chunk(data.data.results, 3);
                console.log("Rows", storiesList.dataRows);
                storiesList.states.loading = false;
            }, function(error) {
                console.log("Error: " + error);
            });
    }

    function chunk(arr, size) {
        var newArr = [];
        for (var i=0; i<arr.length; i+=size) {
            newArr.push(arr.slice(i, i+size));
        }
        return newArr;
    }

    storiesList.LoadStories();

}]);

