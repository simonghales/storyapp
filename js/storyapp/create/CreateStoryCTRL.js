angular
    .module('storyApp')
    .controller('CreateStoryCTRL', CreateStoryCTRL)

.$inject = ['$scope', '$rootScope', '$location', 'StoryService'];

/* @ngInject */
function CreateStoryCTRL($scope, $rootScope, $location, StoryService) {
    /* jshint validthis: true */
    var vm = this;

    vm.form = {
        title: '',
        desc: ''
    }
    vm.states = {
        busy: false,
        error: false
    }

    vm.activate = activate;
    vm.createStory = createStory;

    activate();

    ////////////////

    function activate() {
        console.log("Loaded create story ctrl");
    }

    function createStory(formValid) {
        if(!formValid || vm.states.busy) {
            return;
        }
        if(!$rootScope.states.loggedIn) {
            $rootScope.$broadcast('user-prompt-login');
            return;
        }

        vm.states.busy = true;
        vm.states.error = false;

        var sendData = {
            title: vm.form.title,
            description: vm.form.desc,
            profile_images: [],
            banner_images: [],
            listed: true
        };

        sendData = JSON.stringify(sendData);

        console.log("Sending", sendData);

        StoryService.CreateStory(sendData)
            .then(function(data) {
                vm.states.busy = false;
                if(data.success == false) {
                    vm.states.error = true;
                    console.log("Error: ", data);
                }
                else {
                    console.log("Successfully created story", data);
                    $location.path('/s/' + data.data.id);
                }
            }, function(error) {
                vm.states.error = true;
                vm.states.busy = false;
                console.log("Error: " + error);
            });

        console.log("Create the Story!");

    }


}