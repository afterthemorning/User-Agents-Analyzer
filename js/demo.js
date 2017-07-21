/**    app.js 1.0.0
 *    (c) 2009-2012 Demandware Inc.
 *
 **/

// All java script logic for the application.
// The code relies on the jQuery JS library to be also loaded.


// if jQuery has not been loaded, load from google cdn
if (!window.jQuery) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
    s.setAttribute('type', 'text/javascript');
    document.getElementsByTagName('head')[0].appendChild(s);
}

// Application singleton and namespace object
// ------------------------------------------
var app = (function (app, $) {
    /** ****** private functions & vars **********/

    // cache dom elements accessed multiple times
    // app.ui holds globally available elements
    function initUiCache() {
    }

    function initializeEvents() {
		$(document).on("click",".js-analyze-ueragent", function(){
			var  parser = new UAParser()
				,text   = $("#useragents").val()
				,arry   = text.split("\n")
			    ,result = [];

            if(text === ""){alert("Please input the user agents strings");return false;}

			for(var i=0;i<arry.length;i++) {
				console.debug("No.  " + i + ": "+ arry[i]);
				if("undefined" !== typeof(arry[i]) && arry[i] !== "") {
				  parser.setUA(arry[i]);
				  result.push(loadData(i, parser.getResult()));
				}
			}

			$('.js-data-content').append(result);
		});

		function loadData(row , data){
		  var empty = "N/A";
		  var template = $('#userAgentsData').html();
		  Mustache.parse(template);   // optional, speeds up future uses
		  return rendered = Mustache.render(template, {row: row+1, browser: data.browser.name + " " + data.browser.major || empty, engine: data.engine.name || empty, OS: data.os.name || empty, device: data.device.model || empty});
		  
		}
    }

    function initializeDom() {

    }

    // _app object
    var _app = {

        /**
         * @name init
         * @function
         * @description Master page initialization routine
         */
        init: function () {
            // init global dom elements
            initializeDom();

            // init global events
            initializeEvents();
        }
    };

    return $.extend(app, _app);
}(window.app = window.app || {}, jQuery));

// initialize app
jQuery(document).ready(function () {
    app.init();
});