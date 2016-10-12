function calculateLoS(lightSource) {
  var visionRange = 8;
  var currentTile = 0;
  var currentRow = 1;
  var fadeDistance = 4;

  var initialTileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      initialTileIndex--;

      $('.tile[data-tile-id="'+ initialTileIndex +'"], .entity[data-entity-id="'+ initialTileIndex +'"]').css('opacity', '0');
    });
  });

  for (i = 0; i < visionRange; i++) {
    currentRow = 1;
    fadeDistance--;

    for (j = 0; j < visionRange; j++) {
      var tileIndex = totalTileCount;

      tileSets.map(function(tileArray) {
        tileArray = tileArray.tiles;

        tileArray.map(function(tile) {
          tileIndex--;

          if (tileIndex == lightSource) {
            $('.tile[data-tile-id="'+ tileIndex +'"], .entity[data-entity-id="'+ tileIndex +'"]').css('opacity', '1');
          }

          if (tileIndex == lightSource + (9 * currentRow) + i) {
            if (currentRow < fadeDistance) {
              $('.tile[data-tile-id="'+ tileIndex +'"], .entity[data-entity-id="'+ tileIndex +'"]').css('opacity', '1');
            } else {
              var targetOpacity = 1 - ((currentRow - fadeDistance) / 5);
              $('.tile[data-tile-id="'+ tileIndex +'"], .entity[data-entity-id="'+ tileIndex +'"]').css('opacity', targetOpacity);
            }

            if (tile.interaction == 0) {
              j = visionRange;
            }
          }
        });
      });

      currentRow++;
    }
  }
}

function checkToHideRoom(position) {
  // Hide a room when all tiles have interaction = 0.

  var tileIndex = totalTileCount;

  var wallCount = 0;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (tileIndex > 36) {
        if (tile.interaction == 0 && wallCount != 9) {
          wallCount++;
        } else if (wallCount != 9){
          wallCount = 0;
        }
        if (wallCount >= 9) {
          $('.tile[data-tile-id="'+ tileIndex +'"], .entity[data-entity-id="'+ tileIndex +'"]').css('opacity', '0.2');
        }
      }

    });
  });
}
