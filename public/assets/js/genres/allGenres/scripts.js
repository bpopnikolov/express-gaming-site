$(function () {
  var apiLinkToGetGenres = "http://localhost:3001/" + "api" + location.pathname;

  var mainDiv = $('<div class="center-align"></div>');

  $.ajax({
    type: "GET",
    dataType: "json",
    url: apiLinkToGetGenres,
    success: function (data) {
      var allGenres = data.allGenres;
      allGenres.forEach(function (genre) {
        mainDiv.append(` <a href="${"http://localhost:3001" + location.pathname + '/'+ genre}" class="collection-item"><h5>${genre}</h5></a>`);
      });
      $('.collection').append(mainDiv);
    }
  });
});