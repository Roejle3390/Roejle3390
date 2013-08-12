/*
 * load-file-as-text.js
 *
 * Version 1.0 2013-04-22 by villy.ib.jorgensen@gmail.com
 */


/**
 * Loads the file specified by url into text property of the specified targetId
 *
 * Note! 
 * - use long form <div id="targetId" ></div>
 * - NOT short form: <div id="targetId" />
 */
function loadContent(url, targetId) {
    $.ajax({
        url: url,
        dataType: "text",
        success: function (data) {
            $(targetId).html(data);
        }
    });
};