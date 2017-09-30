$( document ).ready( function() {

    $(".box").float({
        float: true, // true, false
        direction: "vertical", // vertical, horizontal
        distance: 15, // distance of the float
        duration: 500, // transition speed
        fade: {
            direction: "up",  // up, down, left, right, none
            fade: "in",  // in, out
            speed: 500, // animate speed
            distance: 50, // animate distance
            percentageOnScreen: 20 // percentage on the screen
        }
    });

    $(".box2").float({
        fade: {
            direction: "up",  // up, down, left, right, none
            fade: "in",  // in, out
            on: "scroll", // vscroll, isibility (just animated to position),
            distance: 100,
            speed: 100,
            percentageOnScreen: 80 // percentage on the screen
        }
    });

    $(".box3").float();


});
