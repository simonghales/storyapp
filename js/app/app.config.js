
//angular.module('app').constant('API_URL', 'https://morning-mountain-1547.herokuapp.com/api/');
angular.module('app').constant('API_URL', 'https://morning-mountain-1547.herokuapp.com/');

angular.module('app').config(function(RestangularProvider, API_URL) {
    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.setRequestSuffix('/.json');

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
        var extractedData;
        if (operation === "getList") {
            extractedData = data.results;
            extractedData.meta = {
                count: data.count,
                next: data.next,
                previous: data.previous,
            }
            //extractedData.next = data.next;
            //extractedData.previous = data.previous;
        } else {
            extractedData = data;
        }
        return extractedData;
    });

});

angular.module('app').run(function($rootScope, $http, $state, $cookies, ngDialog, AuthenticationResource, UserResource) {

    $rootScope.states = {
        signedIn : false,
        admin : true,
        stateChanging : false
    }

    $rootScope.user = null;

    $rootScope.containerClass = "page__loading";

    (function() {

        if(AuthenticationResource.isAuth()) {
            var token = AuthenticationResource.getAuth();
            AuthenticationResource.setAuth(token);
            $rootScope.states.signedIn = true;

            if(UserResource.isStoredUser()) {
                $rootScope.user = UserResource.getStoredUser();
                console.log("Retrieved user from cookie", $rootScope.user);
            }

            UserResource.getCurrentUserAndStore();

        } else {
            $rootScope.states.signedIn = false;
        }

    })();

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.states.stateChanging = true;
        ngDialog.closeAll();
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = "page__" + toState.activeTab;
        $rootScope.states.stateChanging = false;
    });

    $rootScope.$on('user-signedIn', function() {
        $rootScope.states.signedIn = true;
        $state.go($state.current, {}, {reload: true});
    });

    $rootScope.$on('user-signedOut', function() {
        $rootScope.states.signedIn = false;
        AuthenticationResource.clearAuth();
        $state.go($state.current, {}, {reload: true});
    });

    //if($cookies.get("globals")) {
    //    var globalData = $cookies.get("globals");
    //    globalData = JSON.parse(globalData); // TODO: This breaks the site if it doesn't parse correctly...
    //    $http.defaults.headers.common['Authorization'] = 'JWT ' + globalData.currentUser.token;
    //    $rootScope.globals = globalData;
    //    $rootScope.states.loggedIn = true;
    //
    //    if($cookies.get("userData")) {
    //        var userData = $cookies.get("userData");
    //        userData = JSON.parse(userData);
    //        $rootScope.userData = userData;
    //        if(userData.admin) {
    //            $rootScope.states.admin = true;
    //        }
    //    }
    //
    //} else {
    //    console.log("User is not logged in!");
    //}

});