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

$(function() {
    $(".parallax").parallax();

    $(".materialboxed").materialbox();

    $('#reviewInput').trigger('autoresize');
    $('input#input_text, textarea#reviewInput').characterCounter();

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
        url: "/api" + location.pathname + "/getUserRating",
        success: function(data) {
            if (data.ratingGiven) {
                localStorage.setItem("userRating", data.ratingGiven);
                visualizeUserRatedGame(data.ratingGiven);
            }
        }
    });

    // rating stars effect on hover
    $(".mdi-star-outline").hover(
        function() {
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
        function() {
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

    $(document).on("click", ".rate", function() {
        var firstHiddenStar = $("#rate0");
        var lastHiddenStar = $("#rate11");
        var clickedStar = $(this);
        var starNextToClicked = $(this).next();
        var ratingValue = +($(this).attr("data-rating"));

        var objectToBeSent = {
            rating: ratingValue
        };
        var jsonObj = JSON.stringify(objectToBeSent);
        var url = "/api" + location.pathname + "/setUserRating";

        $.ajax({
            type: "POST",
            url: url,
            data: jsonObj,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                $(firstHiddenStar).nextUntil(lastHiddenStar)
                    .removeClass("mdi-star")
                    .removeClass("clicked")
                    .addClass("mdi-star-outline");

                // save rating to local storage
                localStorage.setItem("userRating", data.contextOfUserRatingReq.rating);

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
            error: function() {
                alert(`Only registered users who are logged in users may vote.
    Please register and/or log in and try again.`);
            }
        });
    });


    var $reviewsForm = $('.review-form');

    $reviewsForm.validate({
        rules: {
            reviewInput: {
                required: true,
                minlength: 5
            },

        },

        //For custom messages
        messages: {
            reviewInput: {
                required: "You must leave a review",
                minlength: $.validator.format("Enter at least {0} characters")
            },
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            var placement = $(element).data("error");
            if (placement) {
                $(placement).append(error);
            } else {
                if ($(element).attr("type") === "file") {
                    $(error).insertAfter(".file-path.validate");
                } else {
                    error.insertAfter(element);
                }
            }
        },
        submitHandler: function(v) {
            console.log('test');
            // const rating = localStorage.getItem("userRating");
            // if (!rating) {
            //     alert("YOU MUST RATE THE GAME FIRST");
            //     return;
            // }

            // var $card = $('<div>');
            // $card.addClass('card', 'horizontal');

            // var $cardStacked = $('<div>');
            // $cardStacked.addClass('card-stacked');

            // var $cardTitle = $('<div>');
            // $cardTitle.addClass('card-title');
            // $cardTitle.text('BOBBY');

            // var $cardContent = $('<div>');
            // $cardContent.addClass('card-content');

            // var $userRating = $('<span>');
            // $userRating.addClass('right');
            // $userRating.text("10/10")

            // var $cardContent = $('<div>');
            // $cardContent.addClass('card-content');

            // var $review = $('<p>')
            // $review.text("asdasdasdasdasdad");

            // $cardTitle.append($userRating);

            // $cardContent.append($cardTitle)
            // $cardContent.append($review);

            // $cardStacked.append($cardContent);

            // $card.append($cardStacked);

            // $(".reviewsWrapper").append($card);

            // v.currentForm.preventDefault();
            const json = {
                gameName: decodeURIComponent(location.pathname.split('games/')[1]),
                review: $('#reviewInput').val()
            };

            httpClient.ajax({
                url: "/api/reviews/addUserReview",
                type: "POST",
                data: json,

            }).then(function(response) {
                console.log(response);

            }).catch(function(err) {
                console.log(err);
                M.toast({
                    html: "Profile wasn't updated"
                });
            });
        }
    });
});
