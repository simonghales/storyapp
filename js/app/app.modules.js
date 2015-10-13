angular.module('app', [
    'app.filters',
    'app.directives',
    'app.services',
    'app.routes',
    'app.account',
    'app.site',
    'app.user',
    'app.story',
    'app.image',
    'ui.router',
    'mp.colorPicker',
    'offClick',
    '720kb.tooltips',
    'ngDialog',
    'ngCookies',
    'ui.router',
    'ngFileUpload',
    'restangular',
    'ngAnimate',
    'templates',
    'contenteditable',
]);

angular.module('app.filters', []);

angular.module('app.directives', []);

angular.module('app.services', []);

angular.module('app.routes', [
    'ui.router',
]);

// Account

angular.module('app.account', [
    'app.account.controllers',
    'app.account.services',
]);

angular.module('app.account.controllers', []);

angular.module('app.account.services', []);

// Site

angular.module('app.site', [
    'app.site.controllers',
    'app.site.directives',
]);

angular.module('app.site.controllers', []);

angular.module('app.site.directives', []);

// User

angular.module('app.user', [
    'app.user.controllers',
    'app.user.services',
]);

angular.module('app.user.controllers', []);

angular.module('app.user.services', []);

// Story

angular.module('app.story', [
    'app.story.services',
    'app.story.controllers',
    'app.story.directives',
]);

angular.module('app.story.services', []);

angular.module('app.story.controllers', []);

angular.module('app.story.directives', []);

// Image

angular.module('app.image', [
    'app.image.services',
    'app.image.controllers',
]);

angular.module('app.image.services', []);

angular.module('app.image.controllers', []);

// Templates

angular
    .module('templates', []);

