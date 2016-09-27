var player, playerPosX, playerPosY, playerPos, playerOrientation, healthPool, tileSets, firstTileSet, lastTileSet;

$(function() {
  $.getJSON("/js/level.json", function(json){
    tileSets = json;

    createMap();
  });

  console.log(tileSets);

  var entityMap = [];

  player = $('.player');
  playerPosX = 0;
  playerPosY = 0;
  playerPos = 113;
  playerOrientation = 'down';

  healthPool = 100;

  $('body').keydown(function() {

    if ( event.which === 39 ) { // Right Array
      console.log('right');
      resetPlayerOrientation();

      movePlayer(playerPos + 1, 0, -32);
      player.addClass('player--look-right');
      playerOrientation = 'right';
    }
    if ( event.which === 37 ) { // Left Array
      console.log('left');
      resetPlayerOrientation();

      movePlayer(playerPos - 1, 0, 32);
      player.addClass('player--look-left');
      playerOrientation = 'left';
    }
    if ( event.which === 38 ) {  // Up Array
      console.log('up');
      resetPlayerOrientation();

      movePlayer(playerPos - 9, 32, 0);
      player.addClass('player--look-up');
      playerOrientation = 'up';
    }
    if ( event.which === 40 ) {  // Down Array
      console.log('down');
      resetPlayerOrientation();

      movePlayer(playerPos + 9, -32, 0);
      player.addClass('player--look-down');
      playerOrientation = 'down';
    }

    if ( event.which === 90 ) {  // Attack Z Array
      attackMain();
    }

  });

  console.log(entityMap);
});

function movePlayer(newPlayerPos, newPosY, newPosX) {
  requestedPlayerPos = newPlayerPos;

  var tileIndex = 0;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex++;

      if (tileIndex == requestedPlayerPos) {
        if (tile.interaction != 0 && tile.entity != 'mob' && healthPool > 0) {
          playerPosY += newPosY;
          playerPosX += newPosX;

          playerPos = newPlayerPos;

          $('.tiles').css('transform','translate('+ playerPosX +'px, '+ playerPosY +'px)');
          $('.backdrop').css('background-position', playerPosX / 10 +'px '+ playerPosY / 10 +'px');

          if (tile.interaction == 2) {
            changeHealthPool(-100, 'You died from Falling, be careful of holes.');
            player.addClass('player--falling');
          } else if (tile.interaction == 3) {
            changeHealthPool(-25, 'You died from a Trap.');
          }

          if (tile.entity == 'key') {
            alertBlock('You grabbed a key.');

            tile.entity = 0;

            $('.entity--'+ tileIndex).remove();
            $('.inventory').append('<div class="inventory-item">'+ tileIndex +'</div>');
          }

        }
      }
    });
  });

  console.log(playerPos);
}

function createMap() {
  var tileIndex = 0;

  firstTileSet = tileSets[0];
  lastTileSet = tileSets[tileSets.length-1];

  console.log(lastTileSet);

  tileSets.shift();
  tileSets.splice(-1,1);

  tileSets = shuffleArray(tileSets);

  firstTileSet.tiles.map(function(tile) {
    tileIndex++;
    console.log('tileIndex: ' + tileIndex);

    $('.tiles').append('<div class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');
  });

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex++;
      console.log('tileIndex: ' + tileIndex);

      $('.tiles').append('<div class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

      if (tile.entity != 0) {

        var entityIndex = tileIndex -1

        var entityPosY = Math.floor(entityIndex / 9);
        var entityPosX = entityIndex - ((entityPosY * 10) - (Math.floor(entityIndex / 9)));

        var entityPosYPx = entityPosY * 32;
        var entityPosXPx = entityPosX * 32;

        console.log('EntityPosY: ' + entityPosY);
        console.log('EntityPosX: ' + entityPosX);

        $('.entities').append('<div class="entity entity--'+ tile.entity +' entity--'+ tileIndex +'" style="transform: translate('+ entityPosXPx +'px, '+ entityPosYPx +'px)">'+ tileIndex +'</div>');
      }
    });
  });

  lastTileSet.tiles.map(function(tile) {
    tileIndex++;
    console.log('tileIndex: ' + tileIndex);

    $('.tiles').append('<div class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');
  });

  tileSets.unshift(firstTileSet);
  tileSets.push(lastTileSet);
}

function changeHealthPool(healthChange, healthAlert = 'You Died.') {
  healthPool += healthChange;

  if (healthPool < 1) {
    alertBlock(healthAlert);

    healthPool = 0;
  }

  $('.health__bar').css('width', healthPool + '%');
}

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

function resetPlayerOrientation() {
  player.removeClass (function (index, css) {
    return (css.match (/(^|\s)player--look\S+/g) || []).join(' ');
  });

  $('.attack').removeClass (function (index, css) {
    return (css.match (/(^|\s)attack--\S+/g) || []).join(' ');
  });
}

function alertBlock(message = '') {
  $('.alert').addClass('alert--is-visible').html(message);

  setTimeout(function() {
    $('.alert').removeClass('alert--is-visible');
  }, 2000);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function openChest(tileId) {
  if ($('.inventory .inventory-item').length) {
    alertBlock('You opened a chest.');
    $('.entity--'+ tileId).remove();
    $('.inventory .inventory-item').remove();
    return true;
  } else {
    alertBlock('You need a key to open the chest.');
    return false;
  }
}

function showHitMarker() {
  console.log('hit');

  $('.hit-marker').addClass('hit-marker--is-active');

  setTimeout(function() {
    $('.hit-marker').removeClass('hit-marker--is-active');
  }, 200);
}

function showAttack(direction) {
  $('.attack').addClass('attack--'+ direction +'');

  setTimeout(function() {
    $('.attack').removeClass('attack--'+ direction +'');
  }, 200);
}
