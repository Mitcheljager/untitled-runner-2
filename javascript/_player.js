function movePlayer(newPlayerPos, newPosY, newPosX) {
  resetPlayerOrientation();

  requestedPlayerPos = newPlayerPos;

  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (playerPos > totalTileCount - 18) {
        addTileArray();
      }

      if (tileIndex == requestedPlayerPos) {
        if (tile.interaction != 0 && tile.entity != 'mob' && healthPool > 0) {
          player.addClass('player--is-walking');

          setTimeout(function() {
            player.removeClass('player--is-walking');
          }, 300);

          playerPosY += newPosY;
          playerPosX += newPosX;

          playerPos = newPlayerPos;

          $('.tiles').css('transform','translate('+ playerPosX +'px, '+ playerPosY +'px)');
          $('.backdrop').css('background-position', playerPosX / 10 +'px '+ playerPosY / 10 +'px');

          if (tile.interaction == 2) {
            changePlayerHealthpool(-100, 'You died from Falling, be careful of holes.');
            player.addClass('player--falling');
          } else if (tile.interaction == 3) {
            changePlayerHealthpool(-25, 'You died from a Trap.');
          }

          if (tile.entity == 'key') {
            alertBlock('You grabbed a key.');

            $('.inventory').append('<div class="inventory-item entity entity--'+ tile.entity +'">'+ tileIndex +'</div>');
            $('.entity--'+ tileIndex).remove();

            tile.entity = 0;
          }

          // takeActionMobs();
        }
      }
    });
  });
}

function resetPlayerOrientation() {
  player.removeClass (function (index, css) {
    return (css.match (/(^|\s)player--look\S+/g) || []).join(' ');
  });

  $('.attack').removeClass (function (index, css) {
    return (css.match (/(^|\s)attack--\S+/g) || []).join(' ');
  });
}

function changePlayerHealthpool(healthChange, healthAlert = 'You Died.') {
  healthPool += healthChange;

  if (healthPool < 1) {
    alertBlock(healthAlert);

    healthPool = 0;
  }

  $('.health__bar').css('width', healthPool + '%');
}
