angular.module('storyApp', ['ui.router', 'mp.colorPicker', 'offClick',
    '720kb.tooltips', 'ngDialog', 'ngCookies', 'ui.router',
    'ngFileUpload']); // , 'ui.bootstrap', 'cgPrompt'

angular.module('storyApp').constant('API_URL', 'https://morning-mountain-1547.herokuapp.com');

angular.module('storyApp').config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    // $locationProvider.html5Mode(true).hashPrefix('!');
    // $locationProvider.html5Mode(true);

    $stateProvider
        //.state('home',
        //    {
        //        url: '',
        //        templateUrl: 'partials/_home.html',
        //        activeTab: 'home',
        //        abstract: true
        //    }
        //)
        .state('home',
            {
                url: '/',
                templateUrl: 'partials/_home.html',
                activeTab: 'home',
                abstract: true
            }
        ).state('home.stories',
            {
                url: '',
                views: {
                    "home": {
                        templateUrl: 'partials/_home_stories.html',
                    }
                }
            }
        ).state('home.create',
            {
                url: 'create',
                views: {
                    "home": {
                        templateUrl: 'partials/_create.html',
                        controller: 'CreateStoryCTRL',
                        controllerAs: 'create',
                    }
                }
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

angular.module('storyApp').run(function($rootScope, $http, $cookies) {

    $rootScope.states = {
        loggedIn : false
    }

    $rootScope.$on('user-loggedIn', function() {
        $rootScope.states.loggedIn = true;
    });

    $rootScope.$on('user-signedOut', function() {
        $rootScope.states.loggedIn = false;
    });

    console.log("Checking for cookies...");

    if($cookies.get("globals")) {
        var globalData = $cookies.get("globals");
        globalData = JSON.parse(globalData); // TODO: This breaks the site if it doesn't parse correctly...
        console.log("User's token", globalData.currentUser.token);
        $http.defaults.headers.common['Authorization'] = 'JWT ' + globalData.currentUser.token;
        $rootScope.globals = globalData;
        $rootScope.states.loggedIn = true;
    } else {
        console.log("User is not logged in!");
    }

    $rootScope.containerClass = "page__loading";

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = "page__" + toState.activeTab;
    });

});