function alertBlock(message = '') {
  $('.alert').addClass('alert--is-visible').html(message);

  setTimeout(function() {
    $('.alert').removeClass('alert--is-visible');
  }, 2000);
}

function showHitMarker() {
  console.log('hit');

  $('.hit-marker').addClass('hit-marker--is-active');

  setTimeout(function() {
    $('.hit-marker').removeClass('hit-marker--is-active');
  }, 200);
}
