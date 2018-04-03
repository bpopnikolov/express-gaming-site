// TODO: change file name to home.js
$(document).ready(function () {
    $("#search-button").on("click", function() {
        var searchValue = $(".input-value").val();
        window.location.href = "/games/gamesByName/" + searchValue;
    });
});
