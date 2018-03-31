$(function () {
    $(".parallax").parallax();

    // parallax init

    // rating stars effect on hover
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

        // same but when leaving hover
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
