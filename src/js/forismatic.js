var forismatic = {};

forismatic.refresh = function(data) {
  $("#quote").text(data.quoteText);
  $("#author").text(data.quoteAuthor);
};

forismatic.done = function(lang) {
	forismatic.localize(lang);
};

forismatic.language = function() {
	return widget.preferenceForKey("language");
};

forismatic.setLanguage = function(lang) {
	widget.setPreferenceForKey(lang, "language");
	$("#language").val(lang);
};

// poor man's localization
forismatic.localize = function(lang) {
	forismatic.setLanguage(lang);
	$("*[data-i18n]").each(function() {
		var element = $(this),
				i18n = element.attr("data-i18n").split("@"),
				key = i18n[0],
				at = i18n[1],
				localized = locale[lang][key] || locale["en"][key];

		if (at) {
			element.attr(at, localized);
		} else {
			element.text(localized);
		}
	});
};

forismatic.load = function() {
	$("#settings").live("click", function() {
		$("#widget").addClass("config");
	});

	$("#language").live("change", function() {
		$(this).data("changed", true);
		// ugly fix for ugly bug: only second click on "Done" works after language changed
		$(this).trigger("blur");
	});

	$("#done").live("click", function() {
		var lang = $("#language");
		if (lang.data("changed")) {
			lang.data("changed", false);
			forismatic.done(lang.val());
			$("#refresh").trigger("click");
		}
		$("#widget").removeClass("config");
	});

	$("#refresh").live("click", function() {
		$.getJSON("http://api.forismatic.com/api/1.0/?callback=?", {
			method: "getQuote",
			lang: $("#language").val(),
			format: "jsonp",
			jsonp: "forismatic.refresh"
		});
	}); 

	var lang = forismatic.language();
	if ("" == lang) {
		lang = window.navigator.language;
	}
	forismatic.setLanguage(lang);

	// force get quote first time
	$("#language").trigger("change");
	$("#refresh").trigger("click");
};

// jQuery's $(document).ready doesn't work here
window.addEventListener("load", forismatic.load, false);
