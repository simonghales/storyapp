var siteFrozen = false;


function freezeSite() {
    siteFrozen = true;
    var scrollOffset = $(window).scrollTop();
    $("#siteWrapper").attr("data-scroll", scrollOffset)
        .css("top", "-" + scrollOffset + "px");
    calculateSiteHeight();
    $("body").addClass("state__siteFrozen");
}

function calculateSiteHeight() {
    var siteHeight = $(window).height();
    $("body").css("height", siteHeight);
}

function unfreezeSite() {
    $("body").css("height", "auto");
    siteFrozen = false;
    $("body").removeClass("state__siteFrozen");
    //$("#siteWrapper").css("top", "auto");
    var scrollOffset = $("#siteWrapper").attr("data-scroll");
    $("body").scrollTop($("body").scrollTop() + scrollOffset);
}

/*
 *	By: 		matthewbyrne
 *	From: 		https://gist.github.com/mathewbyrne/1280286
 */
function slugify(text)
{
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}