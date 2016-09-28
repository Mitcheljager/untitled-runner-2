function entityCheck(entityType, tileId) {
  if (entityType != 0) {

    var entityIndex = tileId -1

    var entityPosY = Math.floor(entityIndex / 9);
    var entityPosX = entityIndex - ((entityPosY * 10) - (Math.floor(entityIndex / 9)));

    var entityPosYPx = entityPosY * 32;
    var entityPosXPx = entityPosX * 32;

    if (entityType == 'mob') {
      var newMob = {'id': tileId, 'name': 'mob', 'health': 100};
      mobMap.push(newMob);
    }

    $('.entities').append('<div class="entity entity--'+ entityType +' entity--'+ tileId +'" data-entity-id="'+ tileId +'" style="transform: translate('+ entityPosXPx +'px, '+ entityPosYPx +'px)">'+ tileId +'</div>');
  }
}
