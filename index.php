<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Chestnut</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
    <script src="Build/UnityLoader.js"></script>
    <script src="js/IndexDB.js<?php echo filemtime('js/IndexDB.js'); ?>" type="text/javascript"></script>
    <script src="js/main.js?<?php echo filemtime('js/main.js'); ?>"></script>
    <link rel="stylesheet" href="css/main.css?<?php echo filemtime('css/main.css'); ?>">
  </head>
  <body class="no-select">
    <script src="js/facebook.js?<?php echo filemtime('js/facebook.js'); ?>"></script>
    <h1 id="fb-welcome"></h1>
    <div class="grid">
      <div class="title"><span class="title-span" lang="en-gb">Welcome to Chestnut Online</span></div>				
      <div class="content"><div class ="content-span"  id="gameContainer"></div></div>
      <div class="footer"><span class="footer-span" lang="en-gb">dannyarnold.com (C) 2017</span></div>
    </div>
    <div id="cover" ><div id="notice">Loading Please Wait</div></div>
  </body>
</html>