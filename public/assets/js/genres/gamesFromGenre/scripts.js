$(function () {
    console.log("api" + location.pathname);
    var apiLinkToGetBooks = 'http://localhost:3001/api/genres/Shooter' ; // "api" + location.pathname;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiLinkToGetBooks,
        success: function(data) {
          console.log(data);
        }
      });
});
