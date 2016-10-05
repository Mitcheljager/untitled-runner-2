function damageCurrentMob(entityId) {

  var mobDeath = false;

  mobMap.map(function(mob) {

    if (mob.id == entityId) {
      if (checkMobHealth(mob.health) == true) {
        mob.health = mob.health - 25;
      } else {
        mobDeath = true;
      }
    }
  });

  return mobDeath;
}

function checkMobHealth(health) {
  if (health > 0) {
    return true;
  } else {
    return false;
  }
}

function mobHurtVisual(element) {
  element.addClass('entity--hurting');

  setTimeout(function() {
    element.removeClass('entity--hurting');
  }, 300);
}

function takeActionMobs() {
  var tileIndex = totalTileCount;

  var playerRow = Math.floor(playerPos / 9) + 1;

  $.each(tileSets, function(key, tileArray) {
    tileArray = tileArray.tiles;

    $.each(tileArray, function(key, tile) {
      tileIndex--;
      var tileRow = Math.floor(tileIndex / 9) + 1;

      if (tile.entity == 'mob') {
        if (tileIndex < playerPos + 36 && tileIndex > playerPos - 36) {
          console.log('in range');

          if (tileIndex > playerPos && tileIndex - 10 < playerPos && playerRow == tileRow) { // Player is to the right
            if (moveMobPosition(tileIndex, tileIndex - 1) != false) {
              removeEntity(tileIndex);
              console.log('right');
              return false;
            }

          } else if (tileIndex < playerPos && tileIndex + 10 > playerPos && playerRow == tileRow) { // Player is left
            if (moveMobPosition(tileIndex, tileIndex + 1) != false) {
              removeEntity(tileIndex);
              console.log('left');
              return false;
            }

          } else if (tileIndex > playerPos) { // Player is below
            if (moveMobPosition(tileIndex, tileIndex - 9) != false) {
              removeEntity(tileIndex);
              console.log('below');
              return false;
            }

          } else if (tileIndex < playerPos) { // Player is above
            if (moveMobPosition(tileIndex, tileIndex + 9) != false) {
              removeEntity(tileIndex);
              console.log('above');
              return false;
            }

          }
        }
      }
    });
  });
}

function moveMobPosition(currentTileId, newTileId) {
  var entityIndex = newTileId;

  var entityPosY = Math.floor(entityIndex / 9);
  var entityPosX = entityIndex - ((entityPosY * 10) - (Math.floor(entityIndex / 9)));

  var entityPosYPx = (entityPosY * 32) * -1;
  var entityPosXPx = (entityPosX * 32) * -1;

  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (tileIndex == newTileId) {

        if (tile.interaction == 1 && tileIndex != playerPos && tile.entity != 'mob') {
          mobMap.map(function(mob) {
            if (mob.id == currentTileId) {
              tile.entity = 'mob';
              mob.id = newTileId;

              $('.entity--mob[data-entity-id="'+ currentTileId +'"]').css('transform','translate('+ entityPosXPx +'px, '+ entityPosYPx +'px)');
              $('.entity--mob[data-entity-id="'+ currentTileId +'"]').removeAttr('data-entity-id').attr('data-entity-id', newTileId);

              return true;
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  });
}

function removeEntity(entityId) {
  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (tileIndex == entityId) {
        tile.entity = '0';
      }
    });
  });
}
