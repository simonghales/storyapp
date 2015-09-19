angular.module('storyApp').directive('uniqueUsername', uniqueUsername);

uniqueUsername.$inject = ['$http'];

function uniqueUsername($http) {
    return {

        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {

            function customValidator(ngModelValue) {
                console.log("Custom validator", ngModelValue);

                //$http({
                //    method: 'POST',
                //    url: '/api/check/' + attrs.ensureUnique,
                //    data: {'field': attrs.ensureUnique}
                //}).success(function(data, status, headers, cfg) {
                //    c.$setValidity('unique', data.isUnique);
                //}).error(function(data, status, headers, cfg) {
                //    c.$setValidity('unique', false);
                //});

                if(ngModelValue == "unique") {
                    ctrl.$setValidity('uniqueUsernameValidator', true);
                    console.log("Ng Model is valid!");
                }

            }

            ctrl.$parsers.push(customValidator);

        }
    };
};