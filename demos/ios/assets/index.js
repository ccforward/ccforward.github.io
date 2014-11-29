(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var bodyCSS = "0px 0px";
var backgroundCSS = "0px 0px";
var contentCSS = "translate3d( 0,0,0 );";

window.ondeviceorientation = function(event) {
    gamma = event.gamma/90;
    beta = event.beta/180;
    var temp = 0;
    
    switch (window.orientation) {
        case 90: 
            temp = gamma;
            gamma = beta;
            beta = temp;
            break;
        case -90: 
            temp = -gamma;
            gamma = beta;
            beta = temp;
            break;
    }
 
    var increment = 15;
    var xPosition = -100 - (gamma * increment);
    var yPosition = -100 - (beta * increment)*2;
    
    bodyCSS = xPosition + "px " + yPosition + "px";
    backgroundCSS = "translate3d( " + (xPosition) + "px, " + (yPosition) + "px, " + " 0px)";
    
    
    var xPosition = -(gamma * increment);
    var yPosition = -(beta * increment);
    contentCSS = "translate3d( " + (-xPosition) + "px, " + (-yPosition) + "px, " + " 0px)";
    
}

function render() {
    window.requestAnimationFrame( render );
    $("body").css( "background-position", bodyCSS);
    // $(".background").css( "-webkit-transform", backgroundCSS);
    $(".wrap").css( "-webkit-transform", contentCSS);
}

render();