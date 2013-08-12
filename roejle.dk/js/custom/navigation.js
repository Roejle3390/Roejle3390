// file: navigation.js


function convertToLinkList(data) {

    var linklist = new Array();

    var lines = data.split(/\r\n|\r|\n/g);

    //alert("Lines in source: " + lines.length);

    var stop;
    var current;
    var ixs;

    // create list without comments.
    {
        stop = lines.length;
        //ixd = 0;
        for (ixs = 0; ixs < stop; ixs++) {
            current = lines[ixs];

            if (current.startsWith("//")) continue;
            linklist.push(current);
        }
    }

    //alert("Lines found I: " + linklist.length);
    return linklist;

}

// function moveForward(url)
// Move to next page in list with reference to current page
function moveForward(url) {

    //alert("moveForward(url)");

    $.ajax({
        url: url,
        dataType: "text",
        success: function (data) {

            var jsdata = $.parseJSON(data);

            var targetUrl;

            // locate link to next page.
            {
                if (jsdata) {
                    if (jsdata.linklist) {
                        var stop = jsdata.linklist.length;
                        jsdata.linklist[stop] = jsdata.linklist[0]; // wrap from last to first.
                        for (var ix = 0; ix < stop; ix++) {
                            if (jsdata.linklist[ix]) {
                                var current = jsdata.linklist[ix];

                                var curl = current.url;

                                if (document.URL.endsWith(curl)) {
                                    //alert("match on: '" + curl + "'");
                                    targetUrl = jsdata.linklist[ix + 1].url;
                                }
                            }
                        }
                    }
                }
            }

            if (targetUrl) {
                //alert("Move to page: '" + targetUrl + "'");
                window.location.href = targetUrl;
            }
        }
    });

};

// function moveBackward(url)
// Move to next page in list with reference to current page
function moveBackward(url) {

    //alert("moveBackward(url)");

    $.ajax({
        url: url,
        dataType: "text",
        success: function (data) {

            var jsdata = $.parseJSON(data);

            var targetUrl;

            // locate link to next page.
            {
                if (jsdata) {
                    if (jsdata.linklist) {
                        var stop = jsdata.linklist.length;
                        jsdata.linklist[stop] = jsdata.linklist[0]; // wrap from forst to last.
                        for (var ix = stop; ix >0; ix--) { // reverse iterate
                            if (jsdata.linklist[ix]) {
                                var current = jsdata.linklist[ix];

                                var curl = current.url;

                                if (document.URL.endsWith(curl)) {
                                    //alert("match on: '" + curl + "'");
                                    targetUrl = jsdata.linklist[ix - 1].url;
                                }
                            }
                        }
                    }
                }
            }

            if (targetUrl) {
                //alert("Move to page: '" + targetUrl + "'");
                window.location.href = targetUrl;
            }
        }
    });

};


// function moveForward(url)
// Move to next page in list with reference to current page
function XmoveForward(url) {

    $.ajax({
        url: url,
        dataType: "text",
        success: function (data) {

            var linklist = convertToLinkList(data);

            var stop;
            var current;
            var ixs;
            var targetUrl;

            //alert("Lines found II: " + linklist.length);

            // locate link to next page.
            {
                stop = linklist.length;

                linklist[stop] = linklist[0]; // wrap to first page from last page

                for (ixs = stop; ixs > 0; ixs--) {
                    current = linklist[ixs];

                    var split = current.indexOf(" ");
                    var urlCurrent = current.substring(0, split).trim();

                    if (document.URL.endsWith(urlCurrent)) {
                        //alert("match on: '" + urlCurrent + "'");
                        current = linklist[ixs - 1];
                        split = current.indexOf(" ");
                        targetUrl = current.substring(0, split).trim();
                    }
                }
            }

            if (targetUrl) {
                //alert("Move to page: '" + targetUrl + "'");
                window.location.href = targetUrl;
            }
        }
    });

};

// function moveBackward(url)
// Move to previous page in list with reference to current page
function XmoveBackward(url) {

    $.ajax({
        url: url,
        dataType: "text",
        success: function (data) {

            var linklist = convertToLinkList(data);

            var stop;
            var current;
            var ixs;
            var targetUrl;

            //alert("Lines found II: " + linklist.length);

            // locate link to next page.
            {
                stop = linklist.length;

                linklist[stop] = linklist[0]; // wrap to last page from first

                for (ixs = stop; ixs > 0; ixs--) {
                    current = linklist[ixs];

                    var split = current.indexOf(" ");
                    var urlCurrent = current.substring(0, split).trim();
                    //var desc = current.substring(split).trim();

                    if (document.URL.endsWith(urlCurrent)) {
                        //alert("match on: '" + urlCurrent + "'");
                        current = linklist[ixs - 1];
                        split = current.indexOf(" ");
                        targetUrl = current.substring(0, split).trim();
                    }
                }
            }

            if (targetUrl) {
                //alert("Move to page: '" + targetUrl + "'");
                window.location.href = targetUrl;
            }
        }
    });

};
