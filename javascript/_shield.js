function toggleShield(requestedShieldState) {
  if (requestedShieldState == true) {
    $('.shield').addClass('shield--active');
  } else if (requestedShieldState == false) {
    $('.shield').removeClass('shield--active');
  }
}
