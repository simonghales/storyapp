var storyApp = angular.module('storyApp', ['ui.router', 'mp.colorPicker', 'offClick', '720kb.tooltips', 'ngDialog', 'ngCookies', 'ui.router']); // , 'ui.bootstrap', 'cgPrompt'

storyApp.constant('API_URL', 'http://morning-mountain-1547.herokuapp.com');

storyApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // $locationProvider.html5Mode(true).hashPrefix('!');
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('home',
            {
                url: '',
                templateUrl: 'partials/_home.html',
                activeTab: 'home'
            }
        )
        .state('home2',
        {
            url: '/',
            templateUrl: 'partials/_home.html',
            activeTab: 'home'
        }
    )
        .state('story',
        {
            url: '/s/:id',
            templateUrl: 'partials/_story.html',
            activeTab: 'story'
        }
    )

});