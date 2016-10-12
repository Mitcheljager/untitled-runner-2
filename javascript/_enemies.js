function damageCurrentMob(entityId) {

  var mobDeath = false;

  mobMap.map(function(mob) {

    if (mob.id == entityId) {
      if (checkMobHealth(mob.health) == true) {
        mob.health = mob.health - 25;

        if (mob.health == 0) {
          mobDeath = true;
        }
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
  var tileIndex = 0;

  var playerRow = Math.floor(playerPos / 9) + 1;

  $.each(mobMap, function(key, mob) {
    if (mob.health > 0) {
      var tileRow = Math.floor(mob.id / 9) + 1;

      if (mob.id < playerPos + 48 && mob.id > playerPos - 48) {
        console.log('in range');

        if (mob.id > playerPos && mob.id - 10 < playerPos && playerRow == tileRow) { // Player is to the right
          if (moveMobPosition(mob.id, mob.id - 1) == 1) {
            mob.id = mob.id - 1;
            console.log('right');
          }

        } else if (mob.id < playerPos && mob.id + 10 > playerPos && playerRow == tileRow) { // Player is left
          if (moveMobPosition(mob.id, mob.id + 1) == 1) {
            mob.id = mob.id + 1;
            console.log('left');
          }

        } else if (mob.id > playerPos) { // Player is below
          if (moveMobPosition(mob.id, mob.id - 9) == 1) {
            mob.id = mob.id - 9;
            console.log('below');
          }

        } else if (mob.id < playerPos) { // Player is above
          if (moveMobPosition(mob.id, mob.id + 9) == 1) {
            mob.id = mob.id + 9;
            console.log('above');
          }

        }
      }
    }
  });
}

function moveMobPosition(currentTileId, newTileId) {
  var entityIndex = newTileId;

  var entityPosY = Math.floor(entityIndex / 9);
  var entityPosX = entityIndex - ((entityPosY * 10) - (Math.floor(entityIndex / 9)));

  var entityPosYPx = (entityPosY * 32) * -1;
  var entityPosXPx = (entityPosX * 32) * -1;

  var tileIndex = totalTileCount;

  var changed = true;

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

              changed = true;

              return 1;
            } else {

            }
          });
        } else if (tileIndex == playerPos) {
          console.log('Monster Attack');
          tile.entity = 'mob';

          changePlayerHealthpool(-1, 'You died to an Enemy.');
        } else {
        }
      }
    });
  });

  removeOldMobPosition();
}

function removeOldMobPosition() {
  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;

      if (tile.entity == 'mob') {
        tile.entity = 0;

        $.each(mobMap, function(key, mob) {
          if (mob.id == tileIndex && mob.health > 0) {
            tile.entity = 'mob';
          }
        });
      }
    });
  });
}
