<?php

$path = explode("/api", dirname($_SERVER['SCRIPT_FILENAME']));
$path = $path[0];
global $path;

require "$path/api/vendor/autoload.php";
require "$path/api/getUserInfo.php";

$app = new \Slim\Slim();
$body= $app->request()->getBody();

$app->get('/startEmUp', function(){
  startEmUp();
  exit;
});

$app->post('/login', function(){
  global $body;

  login($body);
  exit;
});

$app->get('/getProfile/:profile', function($profile){
  getProfile($profile);
  exit;
});

$app->get('/getLikes/:profile', function($profile){
  getLikes($profile);
  exit;
});

$app->get('/getDates/:profile', function($profile){
  getDates($profile);
  exit;
});

$app->get('/loggedin', function(){
  loggedin();
  exit;
});

$app->get('/logout', function(){
  logout();
  exit;
});

// $app->get('/getSettings/:teacher/:classes', function ($teacher,$classes){
//
//     getSettings($teacher,$classes);
//     exit;
//
// });
//
// $app->post('/deleteSurvey/:teacher/:classes', function ($teacher,$classes){
//     global $body;
//
//     deleteSurvey($body,$teacher,$classes);
//     exit;
//
// });

$app->run();
?>
