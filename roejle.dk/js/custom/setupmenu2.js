// File: setupmenu2.js

// Define function startsWith(target) as overload to String.
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

// Define function endsWith(target) as overload to String.
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

function setupMenu2(url, targetId) {


    /* Syntax of json text

    {
       "linklist": [
            { "url":"Index.html", "menu":"Røjlegården", "description":"Røjlegården", "title":"Røjlegården indgangsside", "markup":"<span class=\"icon-home\"></span>"  } 
           ,{ "url":"Honey.html", "menu":"Honning", "description":"Honning fra egne bier" }
           ]
    }

    Mandtory:
    - url : the line matching the current document is processed
    - menu : builds menu with this text pointing to the url.

    Optional
    - description (not used)
    - title (not used)
    - markup (replaceses menu )

    */

    //alert("setupMenu2");

    $.ajax({
        url: url,
        dataType: "text", // "json" returns data as json object
        success: function (data) {

            // data is returned in JSON format.

            //alert("data: '" + data + "'");

            var jsdata = $.parseJSON(data);
            //var jsdata = data;
            var markup = "";

            if (jsdata) {
                if (jsdata.linklist) {
                    var stop = jsdata.linklist.length;
                    for (var ix = 0; ix < stop; ix++) {
                        if (jsdata.linklist[ix]) {
                            var current = jsdata.linklist[ix];
                            
                            var curl = current.url;
                            var cmenu = current.menu; // menu text 
                            //var cdesc = cmenu; // text inside <h1 id="title"></h1> 
                            //var title = cmenu; // text of browser window.
                            var cmarkup = cmenu; // menu text or markup
                            
                            // use 'markup' if it exists.
                            if (current.markup) {
                                cmarkup = current.markup;
                                //alert("has markup '" + cmarkup + "'");
                            }
                            
                            // use 'description' if it exists
                            if (current.description) {
                                //cdesc = current.description;
                                //alert("has description '" + cdesc + "'");
                            }

                            // use 'title' if it exists
                            if (current.title) {
                                //title = current.title;
                                //alert("has title '" + title + "'");
                            }

                            if (document.URL.endsWith(curl)) {
                                markup += "<li class='active'><a href='" + curl + "'>" + cmarkup + "</a></li>";
                                //alert("match");

                                // Dynamically insert browser title and page title.
                                //$("#title").html(cdesc); // reference id="title"
                                //$("title").html(title); // refence <title>...

                            } else {
                                markup += "<li><a href='" + curl + "'>" + cmarkup + "</a></li>";
                            }

                        }
                    }
                }
            }


            //alert("'" + document.URL + "'");

            // insert dynamically biuld menu.
            var postfix = $(targetId).html();
            markup += postfix;
            $(targetId).html(markup);
        }
    });
};
