angular.module('storyApp').factory('Editor', ['$rootScope', function($rootScope){

    var editorData = {
        editingItem : null
    };

    return {
        setEditingItem : function(item, offset) {
            editorData.editingItem = item;
            $rootScope.$broadcast('editor-display', offset);
            // set which item is being edited
        },
        getEditingItem : function() {
            return editorData.editingItem;
        },
        hideEditor : function() {
            $rootScope.$broadcast('editor-hide');
        }
    }

}]);