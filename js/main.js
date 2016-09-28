var player, playerPosX, playerPosY, playerPos, playerOrientation, healthPool, tileSets, firstTileSet, lastTileSet, mobMap, entityMap;

$(function() {
  $.getJSON("/js/level.json", function(json){
    tileSets = json;

    createMap();
  });

  console.log(tileSets);

  entityMap = [];
  mobMap = [];

  player = $('.player');
  playerPosX = 0;
  playerPosY = 0;
  playerPos = 113;
  playerOrientation = 'down';

  healthPool = 100;

  $('body').keydown(function() {

    if ( event.which === 39 ) { // Right Array
      resetPlayerOrientation();

      movePlayer(playerPos + 1, 0, -32);
      player.addClass('player--look-right');
      playerOrientation = 'right';
    }
    if ( event.which === 37 ) { // Left Array
      resetPlayerOrientation();

      movePlayer(playerPos - 1, 0, 32);
      player.addClass('player--look-left');
      playerOrientation = 'left';
    }
    if ( event.which === 38 ) {  // Up Array
      resetPlayerOrientation();

      movePlayer(playerPos - 9, 32, 0);
      player.addClass('player--look-up');
      playerOrientation = 'up';
    }
    if ( event.which === 40 ) {  // Down Array
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
