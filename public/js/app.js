function openChest(tileId) {
  if ($('.inventory .inventory-item').length) {
    alertBlock('You opened a chest.');
    $('.entity--'+ tileId).remove();
    $('.inventory .inventory-item').first().remove();
    return true;
  } else {
    alertBlock('You need a key to open the chest.');
    return false;
  }
}
;function attackMain() {
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
;function damageCurrentMob(entityId) {

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
  var tileIndex = 0;

  $.each(tileSets, function(key, tileArray) {
    tileArray = tileArray.tiles;

    $.each(tileArray, function(key, tile) {
      tileIndex++;

      if (tile.entity == 'mob') {
        if (tileIndex < playerPos + 45 && tileIndex > playerPos - 45) {
          console.log('in range');

          if (tileIndex < playerPos - 1 && tileIndex > playerPos - 10) { // Player is to the right
            if (moveMobPosition(tileIndex, tileIndex + 1) != false) {
              tile.entity = 0;
            }

            console.log('right');
            return false;
          } else if (tileIndex > playerPos + 1 && tileIndex > playerPos - 10) { // Player is left
            if (moveMobPosition(tileIndex, tileIndex - 1) != false) {
              tile.entity = 0;
            }

            console.log('left');
            return false;
          } else if (tileIndex < playerPos + 10) { // Player is below
            if (moveMobPosition(tileIndex, tileIndex + 9) != false) {
              tile.entity = 0;
            }

            console.log('below');
            return false;
          } else if (tileIndex > playerPos + 10) { // Player is above
            if (moveMobPosition(tileIndex, tileIndex - 9) != false) {
              tile.entity = 0;
            }

            console.log('above');
            return false;
          }
        }
      }
    });
  });
}

function moveMobPosition(currentTileId, newTileId) {
  var entityIndex = newTileId - 1;

  var entityPosY = Math.floor(entityIndex / 9);
  var entityPosX = entityIndex - ((entityPosY * 10) - (Math.floor(entityIndex / 9)));

  var entityPosYPx = entityPosY * 32;
  var entityPosXPx = entityPosX * 32;

  var tileIndex = 0;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex++;

      if (tileIndex == newTileId) {

        if (tile.interaction == 1) {
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
;function entityCheck(entityType, tileIndex) {
  if (entityType != 0) {
    calculateEntityPosition(entityType, tileIndex);
  }
}

function calculateEntityPosition(entityType, tileId) {
  var entityPosY = Math.floor(tileId / 9);
  var entityPosX = tileId - ((entityPosY * 10) - (Math.floor(tileId / 9)));

  var entityPosYPx = (entityPosY * 32) * -1;
  var entityPosXPx = (entityPosX * 32) * -1;

  if (entityType == 'mob') {
    var newMob = {'id': tileId, 'name': 'mob', 'health': 100};
    mobMap.push(newMob);
  }

  $('.entities').append('<div class="entity entity--'+ entityType +' entity--'+ tileId +'" data-entity-id="'+ tileId +'" style="transform: translate('+ entityPosXPx +'px, '+ entityPosYPx +'px)">'+ tileId +'</div>');
}
;function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

Array.prototype.getRandomArrayItem = function() {
  return this[Math.floor(Math.random()*this.length)];
}
;function alertBlock(message = '') {
  $('.alert').addClass('alert--is-visible').html(message);

  setTimeout(function() {
    $('.alert').removeClass('alert--is-visible');
  }, 2000);
}

function showHitMarker() {
  console.log('hit');

  $('.hit-marker').addClass('hit-marker--is-active');

  setTimeout(function() {
    $('.hit-marker').removeClass('hit-marker--is-active');
  }, 200);
}
;$('body').keydown(function() {

  if ( event.which === 39 ) { // Right Array
    movePlayer(playerPos - 1, 0, -32);
    player.addClass('player--look-right');
    playerOrientation = 'right';
  }
  if ( event.which === 37 ) { // Left Array
    movePlayer(playerPos + 1, 0, 32);
    player.addClass('player--look-left');
    playerOrientation = 'left';
  }
  if ( event.which === 38 ) {  // Up Array
    movePlayer(playerPos + 9, 32, 0);
    player.addClass('player--look-up');
    playerOrientation = 'up';
  }
  if ( event.which === 40 ) {  // Down Array
    movePlayer(playerPos - 9, -32, 0);
    player.addClass('player--look-down');
    playerOrientation = 'down';
  }

  if ( event.which === 90 ) {  // Attack Z Array
    attackMain();
  }

});
;function createMap() {

  firstTileSet = tileSets[0];
  lastTileSet = tileSets[tileSets.length-1];

  tileSets.shift();

  var tileCount = 0;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileCount++;
    });
  });

  totalTileCount = tileCount;

  tileSets.splice(-1,1);

  tileSets = shuffleArray(tileSets);


  // firstTileSet.tiles.map(function(tile) {
  //   tileIndex--;
  //
  //   $('.tileset').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');
  //
  //   entityCheck(tile.entity, tileIndex);
  // });

  tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;


      $('.tileset').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

      entityCheck(tile.entity, tileIndex);
    });
  });

  lastTileSet.tiles.map(function(tile) {
    tileIndex--;

    $('.tileset').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

    entityCheck(tile.entity, tileIndex);
  });

  // tileSets.unshift(firstTileSet);
  tileSets.push(lastTileSet);

  playerPos = 22;

  console.log(totalTileCount);
}

function addTileArray() {
  var tileIndex = totalTileCount;
  var newTileElements = JSON.parse(JSON.stringify(originalTileSets));

  $.each(newTileElements, function(key, tileArray) {
    if (tileArray.id == 3) {
      newTiles = tileArray.tiles;

      console.log(tileIndex);

      newTiles.reverse().map(function(tile) {
        newTileElements.push('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

        entityCheck(tile.entity, tileIndex);

        tileIndex++;
        totalTileCount++;
      });

      tileSets.unshift(tileArray);
      tileSets[0]['id'] = 14;

      newTileElements.map(function(tile) {
        $('.tileset').prepend(tile);
      });

      newTiles.reverse();

      return false;
    }
  });
}
;function movePlayer(newPlayerPos, newPosY, newPosX) {
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
;var player, playerPosX, playerPosY, playerPos, playerOrientation, healthPool, originalTileSets, tileSets, firstTileSet, lastTileSet, mobMap, totalTileCount;

$(function() {
  $.getJSON("/js/level.json", function(json){
    originalTileSets = json;

    tileSets = JSON.parse(JSON.stringify(originalTileSets));

    createMap();
  });

  mobMap = [];

  player = $('.player');
  playerPosX = 0;
  playerPosY = 0;
  playerPos = 113;
  playerOrientation = 'down';

  healthPool = 100;
});
