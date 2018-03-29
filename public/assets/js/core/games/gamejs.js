// var elem = document.querySelector('.carousel');
// var instance = M.Carousel.init(elem, options);

// Or with jQuery
$(function() {
    // $('.carousel.carousel-slider').carousel({
    //     fullWidth: true,
    //     // indicators: true,
    // });
    $('.parallax').parallax();
    $('.slider').slider({
        indicators: true, // set false to hide slide indicators
        height: 400, // set height of slider
        duration: 500, // set the duration of the transition animation in ms
        interval: 6000, // Set the duration between transitions in ms.
    });
});

// (function($){
//     $(function(){
//       $('.sidenav').sidenav();
//       $('.parallax').parallax();
//     }); // end of document ready
//   })(jQuery); // end of jQuery name space
