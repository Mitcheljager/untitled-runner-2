function rotateShield(event) {
  var shield = $('.shield');
  var offset = shield.offset();

  var centerX = offset.left + 32;
  var centerY = offset.top + 32;
  var mouseX = event.pageX;
  var mouseY = event.pageY;

  var radians = Math.atan2(mouseX - centerX, mouseY - centerY);
  var rotation = (radians * (180 / Math.PI) * -1) + 225;
  var rotationRounded = Math.floor(rotation / 90) * 90;

  shield.css('transform', 'rotate('+ rotationRounded +'deg)');
}

$('.shield-swapper').mousemove(rotateShield);
