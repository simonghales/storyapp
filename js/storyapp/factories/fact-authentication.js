angular.module('storyApp').factory('AuthenticationService', ['$http', '$rootScope', '$cookies', 'API_URL', function($http, $rootScope, $cookies, API_URL){

    var service = {};

    service.Login = Login;
    service.Register = Register;
    service.StoreAuth = StoreAuth;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;

    return service;

    function Login(username, password) {
        var data = {
            username: username,
            password: password
        };
        data = JSON.stringify(data);
        return $http.post(API_URL + '/api-token-auth/.json', data).then(handleSuccess, handleError('Error signing in'));
    }

    function Register(email, username, password) {
        var data = {
            email: email,
            username: username,
            password: password,
            userprofile: {
                avatar_images: [],
                bio: ""
            }
        };
        data = JSON.stringify(data);
        return $http.post(API_URL + '/api/users/create/.json', data).then(handleSuccess, handleError('Error registering'));
    }

    //function Login(username, password, callback) {
    //
    //    /* Use this for real authentication
    //     ----------------------------------------------*/
    //
    //    var apiData = {
    //        username: username,
    //        password: password
    //    }
    //
    //    apiData = JSON.stringify(apiData);
    //
    //    $http.post(API_URL + '/api-token-auth/.json', apiData)
    //        .success(function (response) {
    //            callback(response);
    //        });
    //
    //}

    function StoreAuth(username, token) {
        $rootScope.globals = {
            currentUser: {
                username: username,
                token: token
            }
        }

        var cookieData = JSON.stringify($rootScope.globals);

        $http.defaults.headers.common['Authorization'] = 'JWT ' + token; // jshint ignore:line
        $cookies.put('globals', cookieData);
    }

    function SetCredentials(username, password) {
        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookies.put('globals', $rootScope.globals);
    }

    function ClearCredentials() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = '';
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

// Base64 encoding service used by AuthenticationService
var Base64 = {

    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    },

    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
    }
};