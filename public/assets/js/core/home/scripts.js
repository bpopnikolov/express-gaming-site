// TODO: change file name to home.js
$(document).ready(function () {
    $("#search-button").on("click", function() {
        var searchValue = $(".input-value").val();
        window.location.href = "/games/gamesByName/" + searchValue;
    });

    $(".slider-games").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
});
