$(function () {
  console.log("http://localhost:3001/" + "api" + location.pathname);
  var apiLinkToGetBooks = "http://localhost:3001/" + "api" + location.pathname;
  $.ajax({
    type: "GET",
    dataType: "json",
    url: apiLinkToGetBooks,
    success: function (data) {
      console.log(data);
    }
  });
});