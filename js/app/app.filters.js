angular.module('app.filters').filter('slugify', function ($sce) {
    return function (val) {
        if(!val) return;
        return slugify(val);
    };
});