function attackMain() {
  $('.player').removeClass (function (index, css) {
    return (css.match (/(^|\s)player--attack-\S+/g) || []).join(' ');
  });

  showAttack(playerOrientation);

  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    var tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (tile.entity == 'chest') {
        if (tileIndex - 9 == playerPos) {
          if (openChest(tileIndex)) {
            tile.entity = 0;
            tile.interaction = 1;
          }
        }
      }

      if (tile.entity == 'mob') {
        if (playerOrientation == 'up') {
          if (tileIndex - 9 == playerPos) {
            showHitMarker();

            var targetEntityElement = $('.entity--mob[data-entity-id="'+ tileIndex +'"]');

            if (damageCurrentMob(tileIndex) == true) {
              tile.interaction = 1;
              tile.entity = 0;

              targetEntityElement.remove();
            } else {
              mobHurtVisual(targetEntityElement);
            }
          }
        } else if (playerOrientation == 'right') {
          if (tileIndex + 1 == playerPos) {
            showHitMarker();

            var targetEntityElement = $('.entity--mob[data-entity-id="'+ tileIndex +'"]');

            if (damageCurrentMob(tileIndex) == true) {
              tile.interaction = 1;
              tile.entity = 0;

              targetEntityElement.remove();
            } else {
              mobHurtVisual(targetEntityElement);
            }
          }
        } else if (playerOrientation == 'down') {
          if (tileIndex + 9 == playerPos) {
            showHitMarker();

            var targetEntityElement = $('[data-entity-id="'+ tileIndex +'"]');

            if (damageCurrentMob(tileIndex) == true) {
              tile.interaction = 1;
              tile.entity = 0;

              targetEntityElement.remove();
            } else {
              mobHurtVisual(targetEntityElement);
            }
          }
        } else if (playerOrientation == 'left') {
          if (tileIndex - 1 == playerPos) {
            showHitMarker();

            var targetEntityElement = $('[data-entity-id="'+ tileIndex +'"]');

            if (damageCurrentMob(tileIndex) == true) {
              tile.interaction = 1;
              tile.entity = 0;

              targetEntityElement.remove();
            } else {
              mobHurtVisual(targetEntityElement);
            }
          }
        }
      }
    });
  });
}

function showAttack(direction) {
  $('.player').addClass('player--attack-'+ direction +'');

  setTimeout(function() {
    $('.player').removeClass('player--attack-'+ direction +'');
  }, 300);
}
