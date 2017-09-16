/*==============================
| Float.js BETA
| Created By: Zachary Branson
| Date: Thu Sept 14 2017
==============================*/


$( document ).ready(function() {

    (function( $ ){
      $.fn.float = function( attributes ) {

          // Get the elements identifier.
          elemId = "." + this[0]['className'];

          // If the object is null (no attributes are passed in)
          // assign to an empty object.
          attributes = (attributes == null) ? {} : attributes;

          // Floating Functionality
          float(attributes, elemId);

          // If there is a face attributes
          if(attributes.hasOwnProperty('fade')) {
              fade(attributes, elemId);
          }
      };
    })( jQuery );


    function float(attributes, elemId) {

        // Set the defualts if the user hasnt specified values
        var direction = attributes.hasOwnProperty('direction') ? attributes.direction : "vertical";
        var distance = attributes.hasOwnProperty('distance') ? attributes.distance : 15;
            distance = distance > 0 ? distance : 15;
        var duration = attributes.hasOwnProperty('duration') ? attributes.duration : 200;

        console.log(attributes);
        // Set the transition and speed
        var transition = 'all ' + (duration / 100) + 's ease-out';
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

    function fade(attributes, elemId) {

        // $(elemId).hide();
        $(window).scroll(function() {
            var windowScroll = $(this).scrollTop(),
             elemTop = $(elemId).offset().top,
             windowHeight = $(window).height();

            if ( windowScroll > (elemTop - (windowHeight / attributes.fade.positionFromBottom )) ) {
                 $(elemId).fadeIn(attributes.fade.speed);
            }
        });

    }

});
