angular.module('storyApp',
        [
            'storyApp.story',
            'ui.router',
            'mp.colorPicker',
            'offClick',
            '720kb.tooltips',
            'ngDialog',
            'ngCookies',
            'ui.router',
            'ngFileUpload',
        ]);

angular
    .module('storyApp.story', [
        'storyApp.story.controllers',
        'storyApp.story.directives',
    ]);

angular
    .module('storyApp.story.controllers', []);

angular
    .module('storyApp.story.directives', []);

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
                templateUrl: 'partials/_home_dev.html',
                activeTab: 'home',
                //abstract: true
            }
        )
        //.state('home.stories',
        //    {
        //        url: '',
        //        views: {
        //            "home": {
        //                templateUrl: 'partials/_home_stories.html',
        //            }
        //        }
        //    }
        //).state('home.create',
        //    {
        //        url: 'create',
        //        views: {
        //            "home": {
        //                templateUrl: 'partials/_create.html',
        //                controller: 'CreateStoryCTRL',
        //                controllerAs: 'create',
        //            }
        //        }
        //    }
        //)
        .state('story',
            {
                url: '/s/:id/:slug',
                templateUrl: 'partials/_story.html',
                activeTab: 'story'
            }
        )
        .state('storyShort',
            {
                url: '/s/:id',
                templateUrl: 'partials/_story.html',
                activeTab: 'story'
            }
        )
        .state('testing',
            {
                url: '/testing/:id',
                templateUrl: 'partials/_testing.html',
                activeTab: 'testing'
            }
        )

});

angular.module('storyApp').run(function($rootScope, $http, $cookies) {

    $rootScope.states = {
        loggedIn : false,
        admin : false,
        stateChanging : false
    }

    $rootScope.$on('user-loggedIn', function() {
        $rootScope.states.loggedIn = true;
    });

    $rootScope.$on('user-signedOut', function() {
        $rootScope.states.loggedIn = false;
    });

    if($cookies.get("globals")) {
        var globalData = $cookies.get("globals");
        globalData = JSON.parse(globalData); // TODO: This breaks the site if it doesn't parse correctly...
        $http.defaults.headers.common['Authorization'] = 'JWT ' + globalData.currentUser.token;
        $rootScope.globals = globalData;
        $rootScope.states.loggedIn = true;

        if($cookies.get("userData")) {
            var userData = $cookies.get("userData");
            userData = JSON.parse(userData);
            $rootScope.userData = userData;
            if(userData.admin) {
                $rootScope.states.admin = true;
            }
        }

    } else {
        console.log("User is not logged in!");
    }

    $rootScope.containerClass = "page__loading";

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.states.stateChanging = true;
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = "page__" + toState.activeTab;
        $rootScope.states.stateChanging = false;
    });

});

angular.module('storyApp').filter('slugify', function ($sce) {
    return function (val) {
        if(!val) return;
        return slugify(val);
    };
});