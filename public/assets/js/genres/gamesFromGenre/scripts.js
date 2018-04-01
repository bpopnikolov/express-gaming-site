$(function () {
  console.log("http://localhost:3001/" + "api" + location.pathname);

  (function setPagination() {
    var paramsFromPath = location.pathname.split('/')
      .filter(function (el) {
        return el != '';
      });

    var curPage = 1;
    if (paramsFromPath.length >= 3) {
      curPage = paramsFromPath[2];
    }

    if (curPage >= 1 && curPage <= Number($('ul.pagination li.waves-effect').last().text())) {
      $(`ul.pagination li.waves-effect:contains(${curPage})`).addClass("active");
    }
    

    console.log(curPage);

  })();


  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3001/" + "api" + location.pathname,
    success: function (data) {
      var gamesContainer = $('<div class="row center-align"></div>');
      var gamesObjs = data.gamesObjs;
      gamesObjs.forEach(game => {
        var gameBox = $(`<a href="http://localhost:3001/games/${game.name}" class="game-wrapper"></a>`);

        var gameImgJQ = $(`<img src="${game.coverUrl}" class="game-pic"></img>`);
        var gameTitleJQ = $(`<div class="game-name">Title: <span class="game-label-value">${game.name}<span></div>`);
        var gameRatingJQ = $(`<div class="game-rating">Rating: <span class="game-label-value">${game.rating}</span></div>`);
        var gameGenres = $(`<div class="game-genres">Genres: <span class="game-label-value"> ${game.genres.join(', ')} </span></div>`);

        gameBox.append(gameImgJQ);
        gameBox.append(gameTitleJQ);
        gameBox.append(gameRatingJQ);
        gameBox.append(gameGenres);

        gamesContainer.append(gameBox);
      });

      $('.container.center-align').append(gamesContainer);
    }
  });
});