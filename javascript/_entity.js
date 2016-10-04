function entityCheck(entityType, tileIndex) {
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
