$(function () {
  var apiLinkToGetPlatforms = "/api" + location.pathname;

  var mainDiv = $('<div class="center-align"></div>');

  $.ajax({
    type: "GET",
    dataType: "json",
    url: apiLinkToGetPlatforms,
    success: function (data) {
      var allPlatforms = data.allPlatforms;
      allPlatforms.forEach(function (platform) {
        mainDiv.append(` <a href="${location.pathname + '/'+ platform}" class="collection-item"><h5>${platform}</h5></a>`);
      });
      $('.collection').append(mainDiv);
    }
  });
});
