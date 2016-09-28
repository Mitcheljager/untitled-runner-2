function damageCurrentMob(entityId) {

  var mobDeath = false;

  mobMap.map(function(mob) {

    if (mob.id == entityId) {
      if (checkMobHealth(mob.health) == true) {
        mob.health = mob.health - 25;
      } else {
        mobDeath = true;
      }
    }
  });

  return mobDeath;
}

function checkMobHealth(health) {
  if (health > 0) {
    return true;
  } else {
    return false;
  }
}

function mobHurtVisual(element) {
  element.addClass('entity--hurting');

  setTimeout(function() {
    element.removeClass('entity--hurting');
  }, 300);
}
