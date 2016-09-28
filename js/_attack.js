function attackMain() {
  $('.attack').removeClass (function (index, css) {
    return (css.match (/(^|\s)attack--\S+/g) || []).join(' ');
  });

  showAttack(playerOrientation);

  var tileIndex = 0;

  tileSets.map(function(tileArray) {
    var tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex++;

      if (tile.entity == 'chest') {
        if (tileIndex == playerPos - 9) {
          if (openChest(tileIndex)) {
            tile.entity = 0;
            tile.interaction = 1;
          }
        }
      }

      if (tile.entity == 'mob') {
        if (playerOrientation == 'up') {
          if (tileIndex == playerPos - 9) {
            showHitMarker();
          }
        } else if (playerOrientation == 'right') {
          if (tileIndex == playerPos + 1) {
            showHitMarker();
          }
        } else if (playerOrientation == 'down') {
          if (tileIndex == playerPos + 9) {
            showHitMarker();
          }
        } else if (playerOrientation == 'left') {
          if (tileIndex == playerPos - 1) {
            showHitMarker();
          }
        }
      }
    });
  });
}

function showAttack(direction) {
  $('.attack').addClass('attack--'+ direction +'');

  setTimeout(function() {
    $('.attack').removeClass('attack--'+ direction +'');
  }, 200);
}
