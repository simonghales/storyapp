angular.module('storyApp').factory('StoryService', ['$http', 'API_URL', function($http, API_URL){

    var updatingPages = {};

    var service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.UpdatePageData = UpdatePageData;
    service.CreatePage = CreatePage;
    service.DeletePage = DeletePage;
    service.UploadImage = UploadImage;
    service.CreateStory = CreateStory;
    service.CreateElementGroup = CreateElementGroup;
    service.CreateElement = CreateElement;
    service.GetByUsername = GetByUsername;
    service.DeleteStory = DeleteStory;
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
        console.log("Updating page", sendData, pageId);
        return $http.put(API_URL + '/api/storypages/' + pageId + '/.json', sendData).then(handleSuccess, handleError('Error updating page'));
    }

    function CreatePage(pageData, storyId) {
        console.log("CREATING PAGE", pageData, storyId);
        return $http.post(API_URL + '/api/storypages/.json', pageData).then(handleSuccess, handleError('Error creating page'));
    }

    function DeletePage(pageId) {
        return $http.delete(API_URL + '/api/storypages/' + pageId + '/.json').then(handleSuccess, handleError('Error deleting page'));
    }

    function UpdatingPage(pageId) {

    }

    function UpdatedPage(pageId) {

    }

    function UploadImage(sendData) {
        return $http.post(API_URL + '/api/image/.json', sendData).then(handleSuccess, handleError('Error adding image'));
    }

    function CreateStory(sendData) {
        return $http.post(API_URL + '/api/stories/.json', sendData).then(handleSuccess, handleError('Error creating story'));
    }

    function CreateElementGroup(sendData) {
        return $http.post(API_URL + '/api/elementgroups/.json', sendData).then(handleSuccess, handleError('Error creating element group'));
    }

    function CreateElement(sendData) {
        return $http.post(API_URL + '/api/elements/.json', sendData).then(handleSuccess, handleError('Error creating element'));
    }

    function DeleteStory(storyId) {
        return $http.delete(API_URL + '/api/stories/' + storyId + '/.json').then(handleSuccess, handleError('Error deleting story by id'));
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