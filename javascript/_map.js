function createMap() {

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
}

function addTileArray() {
  var tileIndex = totalTileCount;
  var newTileElements = JSON.parse(JSON.stringify(originalTileSets));

  newTileElements.shift();
  newTileElements.pop();

  var newTileElementsLength = newTileElements.length;

  var newTilesNumber = Math.floor(Math.random() * newTileElementsLength) + 1;

  $.each(newTileElements, function(key, tileArray) {
    if (tileArray.id == newTilesNumber) {
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
