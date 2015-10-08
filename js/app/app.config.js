
angular.module('app').constant('API_URL', 'https://morning-mountain-1547.herokuapp.com/api/');

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

angular.module('app').run(function($rootScope, $http, $cookies) {

    $rootScope.states = {
        loggedIn : true,
        admin : true,
        stateChanging : false
    }

    $rootScope.containerClass = "page__loading";

    //$rootScope.$on('user-loggedIn', function() {
    //    $rootScope.states.loggedIn = true;
    //});
    //
    //$rootScope.$on('user-signedOut', function() {
    //    $rootScope.states.loggedIn = false;
    //});

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

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.states.stateChanging = true;
    });

    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = "page__" + toState.activeTab;
        $rootScope.states.stateChanging = false;
    });

});