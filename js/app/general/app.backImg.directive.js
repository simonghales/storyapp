angular.module('app.directives').directive('backImg', function() {
    return function(scope, element, attrs) {

        attrs.$observe('backImg', function () {
            setBackImg();
        });

        var setBackImg = function() {
            var url = attrs.backImg;

            if (url) {
                element.addClass("__providedImage");
                element.closest(".story-page").addClass("state__loading");

                var img = $("<img />");
                img.attr("src", url);
                img.load(function() {
                    element.css({
                        'background-image': 'url(' + url + ')'
                    });
                    element.removeClass("__noImage");
                    element.closest(".story-page").removeClass("state__loading").addClass("state__loaded");
                });

            } else {
                element.addClass("__noImage");
            }

        }

        setBackImg();


    };
});