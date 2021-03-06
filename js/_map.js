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
  //   $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');
  //
  //   entityCheck(tile.entity, tileIndex);
  // });

  tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    tileArray = tileArray.tiles;

    tileArray.map(function(tile) {
      tileIndex--;


      $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

      entityCheck(tile.entity, tileIndex);
    });
  });

  lastTileSet.tiles.map(function(tile) {
    tileIndex--;

    $('.tiles').append('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');

    entityCheck(tile.entity, tileIndex);
  });

  // tileSets.unshift(firstTileSet);
  tileSets.push(lastTileSet);

  playerPos = 22;

  console.log(totalTileCount);
}

function addTileArray() {
  var tileIndex = totalTileCount;

  tileSets.map(function(tileArray) {
    if (tileArray.id == 5) {
      newTiles = tileArray.tiles.reverse();

      newTiles.map(function(tile) {
        $('.tiles').prepend('<div data-tile-id="'+ tileIndex +'"  class="tile tile--'+ tile.type +' tile--'+ tile.variation +'"></div>');
        entityCheck(tile.entity, tileIndex - 1);

        tileIndex++;
        totalTileCount++;
      });

      tileSets.unshift(tileArray);
    }
  });
}
