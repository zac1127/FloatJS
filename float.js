/*
|-------------------------------------------------
| FLOAT JS
|-------------------------------------------------
|
| Created by: Zachary Branson
| Date Created: 9/14/2017
| GitHub Repository: https://github.com/zac1127/FloatJS
|
*/


$( document ).ready(function() {

    // set the defualt values.
    var defaults = {
        float: true,
        direction: "vertical",
        distance: 15,
        duration: 800,
    };

    var fadeDefaults = {
        direction: "up",  // up, down, left, right, none
        fade: "in",  // in, out
        on: "scroll", // vscroll, isibility (just animated to position),
        distance: 100,
        speed: 800,
        percentageOnScreen: 20, // percentage on the screen
    };

    (function( $ ){
      $.fn.float = function( attributes ) {

          // Get the elements identifier.
          elemId = "." + this[0]['className'];

          // If the object is null (no attributes are passed in)
          // assign to an defaults object.
          attributes = (attributes == null) ? {} : attributes;

          if(! attributes.hasOwnProperty("float") && attributes.float != false) {
              float(attributes, elemId);
          }

          if(attributes.hasOwnProperty("fade")) {
              animate(attributes.fade, elemId);
          }


      };
    })( jQuery );


    function float(attributes, elemId) {

        // Set the defualts if the user hasnt specified values
        var direction = attributes.hasOwnProperty('direction') ? attributes.direction : defaults.direction;
        var distance = attributes.hasOwnProperty('distance') ? attributes.distance : defaults.distance;
            distance = distance > 0 ? distance : defaults.distance;
        var duration = attributes.hasOwnProperty('duration') ? attributes.duration : defaults.duration;

        // Set the transition and speed
        var transition = 'all ' + (duration / 1000) + 's ease-out';

        $(elemId).css({
               WebkitTransition : transition,
               MozTransition    : transition,
               MsTransition     : transition,
               OTransition      : transition,
               transition       : transition
        });


        $(window).scroll(function() {

            var windowScroll = $(this).scrollTop(),
             elemTop = $(elemId).offset().top,
             windowHeight = $(window).height();

            // If the element is visible on the screen.
            if ( windowScroll > (elemTop - windowHeight) ) {

                if(attributes.hasOwnProperty('fade')) {
                    $(elemId).fadeIn(attributes.fade.speed);
                }

                var transformAmount = (windowScroll - (elemTop - windowHeight)) / distance;
                transformAmount = attributes.movement == "reverse" ? transformAmount * -1 : transformAmount;

                switch(direction) {
                    case "horizontal":
                        $(elemId).css({
                            "transform": "translateX(" + transformAmount + "%)"
                        });
                        break;

                    default: // vertical
                        $(elemId).css({
                            "transform": "translateY(" + transformAmount + "%)"
                        });

                } // end switch
            } // end if on screen
        }); // end window scroll
    } // end float


    function animate(fadeAttributes, elemId) {

        var fade = fadeAttributes.fade == "out" ? '1' : '0';
        var distance = fadeAttributes.distance;
        var direction = fadeAttributes.hasOwnProperty("direction") ? fadeAttributes.direction : null;
        var percentageOnScreen = fadeAttributes.hasOwnProperty("speed") ? fadeAttributes.percentageOnScreen : fadeDefaults.percentageOnScreen;
        var speed = fadeAttributes.hasOwnProperty("speed") ? fadeAttributes.speed / 1000 : fadeDefaults.speed / 1000;
        var transition = 'all ease-out ' + speed + 's';


        switch(fadeAttributes.direction) {
            case "right":
            $(elemId).css({
                'transform': 'translateX(-' + distance + 'px)',
                'opacity': fade
            });
            break;
            case "left":
            $(elemId).css({
                'transform': 'translateX(' + distance + 'px)',
                'opacity': fade
            });
            break;
            case "up":
            $(elemId).css({
                'transform': 'translateY(' + distance + 'px)',
                'opacity': fade
            });
            break;
            case "down":
            $(elemId).css({
                'transform': 'translateY(-' + distance + 'px)',
                'opacity': fade
            });
            break;
            default:

            $(elemId).css({
                WebkitTransition : transition,
                MozTransition    : transition,
                MsTransition     : transition,
                OTransition      : transition,
                transition       : transition,
                'transform': 'translateY(0px)',
                'opacity': fade
            });

        }

        var faded = false; // only wants to run the style once.
        $(window).scroll(function() {
            var windowScroll = $(this).scrollTop(),
             elemTop = $(elemId).offset().top,
             windowHeight = $(window).height();

            // If the element is visible on the screen.
            if ( windowScroll > (elemTop - windowHeight) + (windowHeight / (100 / percentageOnScreen)) ) {
                //only want to do this once..
                if(!faded) {
                    $(elemId).css({
                        'transform': 'translateY(0px)',
                        'opacity': (fade == 1) ? '0' : '1'
                    });
                }
                faded = true;
            }
        });
    }
});
