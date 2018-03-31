$(function() {
    $(".parallax").parallax();
    $(".materialboxed").materialbox();

    // replace prallax img url
    var $parallaxImg = $(".parallax img");
    var parralaxImgSrc = $parallaxImg.attr("src").replace("t_cover_big", "t_screenshot_big");
    $parallaxImg.attr("src", parralaxImgSrc);

    $(".carousel").carousel({
        duration: 200, // ms
        dist: -100, // zoom scale TODO: make this more intuitive as an option
        shift: 0, // spacing for center image
        padding: 0, // Padding between non center items
        fullWidth: true, // Change to full width styles
        indicators: true, // Toggle indicators
        noWrap: false, // Don't wrap around and cycle through items.
        onCycleTo: null // Callback for when a new slide is cycled to.
    });


    // rating stars effect on hover
    $(".mdi-star-outline").hover(
        function() {
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
        function() {
            var anchorNextToHoveredStar = $(this).next();
            var firstHiddenAnchor = $("#rate0");

            $(firstHiddenAnchor).nextUntil(anchorNextToHoveredStar)
                .removeClass("mdi-star")
                .addClass(" mdi-star-outline ");

            $(".view-rating")
                .html("");
        });

    // // textarea
    // $("#textarea1").val("");
    // M.textareaAutoResize($("#textarea1"));
});

$(document).on("click", ".rate", function() {
    var ratingValue = +($(this).attr("data-rating"));
    var gameId = +($("#rate0").text());
    // var userId = 
    // console.log(gameId);
    // console.log(ratingValue);
    // console.log(typeof(ratingValue));
    // var xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "http://localhost:3001/games/", true);

    var objectToBeSent = {
        rating: ratingValue,
        gameId: 49,
        userId: 1,
    };

    var jsonObj = JSON.stringify(objectToBeSent);
    var url = "games/" + gameId;
    console.log(url);

    $.ajax({
        type: "POST",
        url: url,
        data: jsonObj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Success");
        },
        error: function () {
            alert("Error");
        }
    });
});
