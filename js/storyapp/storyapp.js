angular.module('storyApp', ['ui.router', 'mp.colorPicker', 'offClick',
    '720kb.tooltips', 'ngDialog', 'ngCookies', 'ui.router',
    'ngFileUpload']); // , 'ui.bootstrap', 'cgPrompt'

angular.module('storyApp').constant('API_URL', 'http://morning-mountain-1547.herokuapp.com');

angular.module('storyApp').config(function($stateProvider, $locationProvider, $urlRouterProvider) {

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
        ).state('home2',
            {
                url: '/',
                templateUrl: 'partials/_home.html',
                activeTab: 'home'
            }
         ).state('story',
            {
                url: '/s/:id',
                templateUrl: 'partials/_story.html',
                activeTab: 'story'
            }
        ).state('create',
            {
                url: '/create',
                templateUrl: 'partials/_create.html',
                activeTab: 'create'
            }
        )

});

angular.module('storyApp').run(function($rootScope, $http, $cookies) {

    console.log("Checking for cookies...");

    if($cookies.get("globals")) {
        var globalData = $cookies.get("globals");
        globalData = JSON.parse(globalData); // TODO: This breaks the site if it doesn't parse correctly...
        console.log("User's token", globalData.currentUser.token);
        $http.defaults.headers.common['Authorization'] = 'JWT ' + globalData.currentUser.token;
    }

    $rootScope.containerClass = "page__loading";

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = "page__" + toState.activeTab;
    });

});