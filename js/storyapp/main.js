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