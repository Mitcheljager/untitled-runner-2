$('body').keydown(function() {

  if ( event.which === 39 ) { // Right Array
    movePlayer(playerPos - 1, 0, -32);
    player.addClass('player--look-right');
    playerOrientation = 'right';
  }
  if ( event.which === 37 ) { // Left Array
    movePlayer(playerPos + 1, 0, 32);
    player.addClass('player--look-left');
    playerOrientation = 'left';
  }
  if ( event.which === 38 ) {  // Up Array
    movePlayer(playerPos + 9, 32, 0);
    player.addClass('player--look-up');
    playerOrientation = 'up';
  }
  if ( event.which === 40 ) {  // Down Array
    movePlayer(playerPos - 9, -32, 0);
    player.addClass('player--look-down');
    playerOrientation = 'down';
  }

  if ( event.which === 90 ) {  // Attack Z Array
    attackMain();
  }

});
