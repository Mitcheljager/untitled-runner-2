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

function openDoor(tileId) {
  if ($('.inventory .inventory-item').length) {
    alertBlock('You opened a door.');
    $('.entity--'+ tileId).addClass('entity--door--open');
    $('.inventory .inventory-item').first().remove();

    // for (i = 0; i < 5; i++) {
    //   addTileArray();
    // }
    //
    // addDoor();

    return true;
  } else {
    alertBlock('You need a key to open the door.');
    return false;
  }
}
