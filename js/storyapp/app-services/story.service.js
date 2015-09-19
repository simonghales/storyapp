angular.module('storyApp').factory('StoryService', ['$http', 'API_URL', function($http, API_URL){

    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.UpdatePageData = UpdatePageData;
    service.UploadImage = UploadImage;
    service.CreateStory = CreateStory;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
        return $http.get(API_URL + '/api/stories/.json?limit=15&order=age').then(handleSuccess, handleError('Error getting all stories'));
    }

    function GetById(id) {
        return $http.get(API_URL + '/api/stories/' + id + '/.json').then(handleSuccess, handleError('Error getting story by id'));
    }

    function UpdatePageData(sendData, pageId) {
        return $http.put(API_URL + '/api/storypages/' + pageId + '/.json', sendData).then(handleSuccess, handleError('Error adding image'));
    }

    function UploadImage(sendData) {
        return $http.post(API_URL + '/api/image/.json', sendData).then(handleSuccess, handleError('Error adding image'));
    }

    function CreateStory(sendData) {
        return $http.post(API_URL + '/api/stories/.json', sendData).then(handleSuccess, handleError('Error creating story'));
    }

    function GetByUsername(username) {
        return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
    }

    function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(user) {
        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
    }

    function Delete(id) {
        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
    }

    // private functions

    function handleSuccess(data) {
        return data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

}]);