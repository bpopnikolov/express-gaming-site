// var elem = document.querySelector('.carousel');
// var instance = M.Carousel.init(elem, options);

// Or with jQuery
$(function () {
    $(".parallax").parallax();

    // slider js
    // $(".slider").slider({
    //     indicators: true, // set false to hide slide indicators
    //     height: 400, // set height of slider
    //     duration: 500, // set the duration of the transition animation in ms
    //     interval: 6000 // Set the duration between transitions in ms.
    // });

    $(" .mdi-star-outline ").hover(
        function () {
            var anchorNextToHoveredStar = $(this).next();
            var firstHiddenAnchor = $("#rate0");

            // replace icons of all rating stars before and including hovered
            $(firstHiddenAnchor)
                .nextUntil(anchorNextToHoveredStar)
                .removeClass("mdi-star-outline")
                .addClass("mdi-star");

            // visualize rating x/10
            $(".view-rating")
                .html(($(this).attr("data-rating")) + "/10");
        },
        function () {
            var anchorNextToHoveredStar = $(this).next();
            var firstHiddenAnchor = $("#rate0");

            $(firstHiddenAnchor).nextUntil(anchorNextToHoveredStar)
                .removeClass("mdi-star")
                .addClass(" mdi-star-outline ");

            $(".view-rating")
                .html("");
        });


    // slider init
    $(".slider-games").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    // // textarea
    // $("#textarea1").val("");
    // M.textareaAutoResize($("#textarea1"));
});
