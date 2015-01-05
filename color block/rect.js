// CSE 190 M, Spring 2009, Marty Stepp
// JavaScript code for colored rectangles example

var NUM_RECT_BABIES = 100;

$$ = function(selector) {
    return document.querySelectorAll(selector);
}
$ = function(id) {
    return document.getElementById(id);
}

window.onload = function() {
    $("color").onclick = colorClick;
        
    // create many rectangles and add them to the page
    for (var i = 0; i < NUM_RECT_BABIES; i++) {
        var rect = document.createElement("div");
        rect.className = "rectangle";
        var x = Math.floor(Math.random() * 750);
        var y = Math.floor(Math.random() * 250);
        rect.style.left = x + "px";
        rect.style.top = y + "px";
        $("rectanglearea").appendChild(rect);
    }

    var rects = $$("div.rectangle");
    for (var i = 0; i < rects.length; i++) {
        rects[i].onclick = xxClick(rects[i]);
    }

    function xxClick(rect) {
        return function() {
            $("rectanglearea").removeChild(rect);
            $("rectanglearea").appendChild(rect);
        }

    }


};

// Called when the Color button is pressed.
// Gives every rectangle on the page a random color.
function colorClick() {
    // in the CSS, we would have written:
    // color: rgb(255, 192, 187);
    var rects = $$("div.rectangle");
    for (var i = 0; i < rects.length; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        rects[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


