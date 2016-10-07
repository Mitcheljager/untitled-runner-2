var player, playerPosX, playerPosY, playerPos, playerOrientation, healthPool, originalTileSets, tileSets, firstTileSet, lastTileSet, mobMap, totalTileCount;

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

  var a = 7,
      b = 3,
      c = 5,
      d = 12,
      e = 0,
      f = 9,
      g = 14,
      h = 1,
      i = 11,
      j = 2,
      k = 8,
      l = 15,
      m = 10,
      n = 4,
      o = 13,
      p = 6;

  var q = (f - b) * (g - i) + o + (p * j) - a;
  var r = k + l + e * (m - d) + c - n - h;
  var s = q + r;
  var t = q - r;

  console.log(q);
  console.log(r);
  console.log(s);
  console.log(t);
});

$(window).load(function() {
  $('body').removeClass('loading');
});
