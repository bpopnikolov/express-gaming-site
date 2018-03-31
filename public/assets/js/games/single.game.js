$(function() {
    $(".parallax").parallax();

    // parallax init

    // slider init
    $(".slider-games").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
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

$(document).on("click", ".rate", function () {
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
