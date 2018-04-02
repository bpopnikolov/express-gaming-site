// function used to visualize rating given previously by the user who has to be logged in
function visualizeUserRatedGame(rating) {
    var firstHiddenStar = $("#rate0");
    var ratedStar = $(`#rate${rating}`);
    var starNextToRated = $(`#rate${rating + 1}`);

    $(firstHiddenStar).nextUntil(starNextToRated)
        .removeClass("mdi-star")
        .removeClass("clicked")
        .addClass("mdi-star-outline");

    $(ratedStar).addClass("clicked");

    $(firstHiddenStar).nextUntil(starNextToRated)
        .removeClass("mdi-star-outline")
        .addClass("mdi-star");

    $(".view-rating")
        .html("You've rated this game: " + rating + "/10");

    // $(".avg-rating")
    //     .html(`${data.contextOfAvgRating.avgRating}`);

    // $(".user-count")
    //     .html(`Based on ${data.contextOfAvgRating.userCount} user ratings`)
};

$(function () {
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

    // visualize previously given rating to game by user who is logged in
    $.ajax({
        type: "GET",
        dataType: "json",
        url: location.pathname + "/api",
        success: function (data) {
            if (data.ratingGiven) {
                visualizeUserRatedGame(data.ratingGiven);
            }
        }
    });

    // rating stars effect on hover
    $(".mdi-star-outline").hover(
        function () {
            var anchorNextToHoveredStar = $(this).next();
            var firstHiddenAnchor = $("#rate0");
            var clickedStar = $(".clicked");
            var anchorNextToClickedStar = clickedStar.next();

            // replace icons of all rating stars before and including hovered
            if (clickedStar.length === 0) {
                $(firstHiddenAnchor)
                    .nextUntil(anchorNextToHoveredStar)
                    .removeClass("mdi-star-outline")
                    .addClass("mdi-star");
            } else {
                $(firstHiddenAnchor)
                    .nextUntil(anchorNextToClickedStar)
                    .removeClass("mdi-star")
                    .addClass("mdi-star-outline");

                $(firstHiddenAnchor)
                    .nextUntil(anchorNextToHoveredStar)
                    .removeClass("mdi-star-outline")
                    .addClass("mdi-star");
            }

            // visualize rating x/10
            $(".view-rating")
                .html(($(this).attr("data-rating")) + "/10");
        },

        // same but when leaving hover
        function () {
            var anchorNextToHoveredStar = $(this).next();
            var firstHiddenAnchor = $("#rate0");
            var clickedStar = $(".clicked");
            var anchorNextToClickedStar = clickedStar.next();
            var ratingToDisplay = clickedStar.attr("data-rating");
            if (clickedStar.length === 1) {
                $(clickedStar)
                    .nextUntil(anchorNextToHoveredStar)
                    .removeClass("mdi-star")
                    .addClass(" mdi-star-outline ");

                $(firstHiddenAnchor)
                    .nextUntil(anchorNextToClickedStar)
                    .removeClass("mdi-star-outline")
                    .addClass("mdi-star");

                $(".view-rating")
                    .html("You've rated this game: " + ratingToDisplay + "/10");
            } else {
                $(firstHiddenAnchor)
                    .nextUntil(anchorNextToHoveredStar)
                    .removeClass("mdi-star")
                    .addClass(" mdi-star-outline ");

                $(".view-rating")
                    .html("Need more ratings");
            }
        });

    $("#review-form").on("change", function () {
        if ($("#textarea").val()) {
            $("#post-review").removeClass("disabled");
        } else {
            $("#post-review").addClass("disabled");
        }
    });
});

$(document).on("click", ".rate", function () {
    var firstHiddenStar = $("#rate0");
    var lastHiddenStar = $("#rate11");
    var clickedStar = $(this);
    var starNextToClicked = $(this).next();
    var ratingValue = +($(this).attr("data-rating"));

    var objectToBeSent = {
        rating: ratingValue
    };
    var jsonObj = JSON.stringify(objectToBeSent);
    var url = location.pathname;

    $.ajax({
        type: "POST",
        url: url,
        data: jsonObj,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(firstHiddenStar).nextUntil(lastHiddenStar)
                .removeClass("mdi-star")
                .removeClass("clicked")
                .addClass("mdi-star-outline");

            $(clickedStar).addClass("clicked");

            $(firstHiddenStar).nextUntil(starNextToClicked)
                .removeClass("mdi-star-outline")
                .addClass("mdi-star");

            $(".view-rating")
                .html("You've rated this game: " + data.contextOfUserRatingReq.rating + "/10");

            $(".avg-rating")
                .html(`${data.contextOfAvgRating.avgRating}`)

            $(".user-count")
                .html(`Based on ${data.contextOfAvgRating.userCount} user ratings`);
            // alert("Success");
        },
        error: function () {
            alert(`Only registered users who are logged in users may vote.
Please register and/or log in and try again.`);
        }
    });
});

// $(document).on("change", "#textarea", function () {
//         if ($("#textarea").text() !== "") {
//             $("#post-review").removeClass("disabled");
//         } else {
//             $("#post-review").addClass("disabled");
//         }
// });

