$(function () {
  var apiLinkToGetGenres = "/api" + location.pathname;

  var mainDiv = $('<div class="center-align"></div>');

  $.ajax({
    type: "GET",
    dataType: "json",
    url: apiLinkToGetGenres,
    success: function (data) {
      var allGenres = data.allGenres;
      allGenres.forEach(function (genre) {
        mainDiv.append(` <a href="${location.pathname + '/'+ genre}" class="collection-item"><h5>${genre}</h5></a>`);
      });
      $('.collection').append(mainDiv);
    }
  });
});
