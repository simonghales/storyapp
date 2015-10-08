angular.module('app', [
    'app.filters',
    'app.directives',
    'app.routes',
    'app.story',
    'ui.router',
    'mp.colorPicker',
    'offClick',
    '720kb.tooltips',
    'ngDialog',
    'ngCookies',
    'ui.router',
    'ngFileUpload',
    'restangular',
    'ngAnimate'
]);

angular.module('app.filters', []);

angular.module('app.directives', []);

angular.module('app.routes', [
    'ui.router',
]);

angular.module('app.story', [
    'app.story.services',
    'app.story.controllers',
    'app.story.directives',
]);

angular.module('app.story.services', []);

angular.module('app.story.controllers', []);

angular.module('app.story.directives', []);
