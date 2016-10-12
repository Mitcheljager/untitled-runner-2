var player, playerPosX, playerPosY, playerPos, playerOrientation, healthPool, originalTileSets, tileSets, firstTileSet, lastTileSet, mobMap, totalTileCount, score, scoreModifier;

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

  score = 0;
  scoreModifier = 1;
});

$(window).load(function() {
  $('body').removeClass('loading');
});
