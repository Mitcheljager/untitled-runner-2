<!DOCTYPE html>
<!--[if lt IE 8]>   <html class="no-js lt-ie8 lt-ie9 lt-ie10 lt-ie11"> <![endif]-->
<!--[if IE 8]>      <html class="no-js lt-ie9 lt-ie10 lt-ie11"> <![endif]-->
<!--[if IE 9]>      <html class="no-js lt-ie10 lt-ie11"> <![endif]-->
<!--[if IE 10]>     <html class="no-js lt-ie11"> <![endif]-->
<!--[if gt IE 10]><!-->  <html class="no-js"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ymir</title>

  <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
  <link href="/css/layout.css" rel="stylesheet" type="text/css" />
</head>

<body class="loading">
  <section class="app">
    <div class="interface">
      <div class="health">
        <div class="health__bar"></div>
      </div>

      <div class="hit-marker">
        Hit
      </div>

      <div class="inventory"></div>

      <nav class="controls">
        <div class="controls__btn controls__btn--up">&lt;</div>
        <div class="controls__btn controls__btn--right">&lt;</div>
        <div class="controls__btn controls__btn--down">&lt;</div>
        <div class="controls__btn controls__btn--left">&lt;</div>
      </nav>

      <div class="alert">
        You Died.
      </div>
    </div>

    <div class="play-board">

      <div class="player">
        <div class="attack"></div>
      </div>

      <div class="tiles">
        <div class="entities"></div>
        <div class="tileset"></div>
      </div>

    </div>

    <div class="backdrop"></div>
  </section>

  <audio autoplay loop style="display: none;">
    <source src="/music/when-times-were-calm.mp3" type="audio/mpeg">
  </audio>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="/js/app.js"></script>
</body>
</html>
