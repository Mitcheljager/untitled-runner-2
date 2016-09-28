function createMap() {
  var tileIndex = 0;

  firstTileSet = tileSets[0];
  lastTileSet = tileSets[tileSets.length-1];

  tileSets.shift();
  tileSets.splice(-1,1);

  tileSets = shuffleArray(tileSets);

  firstTileSet.tiles.map(function(tile) {
    tileIndex++;

    $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

    entityCheck(tile.entity, tileIndex);
  });

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex++;

      $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

      entityCheck(tile.entity, tileIndex);
    });
  });

  lastTileSet.tiles.map(function(tile) {
    tileIndex++;

    $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

    entityCheck(tile.entity, tileIndex);
  });

  tileSets.unshift(firstTileSet);
  tileSets.push(lastTileSet);

  playerPos = tileIndex - 22;
}
