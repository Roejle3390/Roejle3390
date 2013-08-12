/* ===================================================
 * textsize.js v1.0.0
 * ===================================================
 * Copyright Villy Ib Jørgensen
 * ===================================================
 * Increase or decrease test size on web page.
 *
 * Required:
 * - jquery-1.9.-.js
 * - jquery.cookie.js
 * =================================================== */

/**
 * Persistently change the text size for the whole web page.
 * fontSize is stored in cookie.
 * font-size is incremented/decremented by 2px;
 * line-height is incremented/decremented by 2px.
 * use code:
 * - onclick="increase()
 * - onclick="decrease()
 */

/**
 * Private - increment/decrement/read value of cookie 'FontSize'.
 */
function updateCookie(change) {
    var raw = $.cookie("FontSize");
    //alert("Raw: '" + raw + "'");
    var cookieValue = 0;
    if (raw != null) {

        cookieValue = parseInt(raw);

        if (isNaN(cookieValue)) {
            cookieValue = 0;
            //alert("isNaN(...)");
        }

        //alert("Restored value: " + cookieValue);
    }

    cookieValue = cookieValue + change;
    //alert("Saved value '" + cookieValue + "'");
    $.cookie("FontSize", cookieValue, { expires: 60 }); // last for 60 days.
    return cookieValue;
}

/**
 * Call this from button Increase Text Size.
 */
function increase() {
    var fontSize = parseFloat($("body").css("font-size"));
    //var t1 = fontSize;
    fontSize = fontSize + 2;
    if (fontSize > 22) {
        return;
    }

    $("body").css({ 'font-size': fontSize + "px" });
    //var t2 = parseFloat($("body").css("font-size"));
    //alert("Before: " + t1 + " after: "+ t2);

    var lineHeight = parseFloat($("body").css("line-height"));
    lineHeight = lineHeight + 2;
    $("body").css({ 'line-height': lineHeight + "px" });
    updateCookie(2);
}

/**
 * Call this from button Decrease Text Size.
 */
function decrease() {
    var fontSize = parseFloat($("body").css("font-size"));
    //var t1 = fontSize;
    fontSize = fontSize - 2;
    if (fontSize < 12) {
        return;
    }
    $("body").css({ 'font-size': fontSize + "px" });

    //var t2 = parseFloat($("body").css("font-size"));
    //alert("Before: " + t1 + " after: " + t2);

    var lineHeight = parseFloat($("body").css("line-height"));
    lineHeight = lineHeight - 2;
    $("body").css({ 'line-height': lineHeight + "px" });
    updateCookie(-2);
}

/**
 * Call this when page is loaded to restore saved size.
 */
function preset() {
    var savedValue = updateCookie(0);
    var fontSize = parseFloat($("body").css("font-size"));
    //var t1 = fontSize;
    fontSize = fontSize + savedValue;
    $("body").css({ 'font-size': fontSize + "px" });

    //var t2 = parseFloat($("body").css("font-size"));
    //alert("Preset before: " + t1 + " after: " + t2);

    var lineHeight = parseFloat($("body").css("line-height"));
    lineHeight = lineHeight + savedValue;
    $("body").css({ 'line-height': lineHeight + "px" });
}

/**
 * Restore fontSize for whole page.
 */
$(window).load(function () { //start after HTML, images have loaded
    preset();
});
