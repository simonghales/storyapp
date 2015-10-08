angular.module('app.routes').config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // $locationProvider.html5Mode(true).hashPrefix('!');
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('home',
            {
                url: '/',
                templateUrl: 'partials/_home_dev.html',
                activeTab: 'home',
                controller: 'StoryHomeCTRL',
                controllerAs: 'home'
            }
        )
        .state('story',
            {
                url: '/s/:id/:slug',
                templateUrl: 'partials/story/_story.html',
                activeTab: 'story',
                controller: 'StoryCTRL',
                controllerAs: 'story'
            }
        )

});