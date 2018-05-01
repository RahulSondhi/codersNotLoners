<?php

$path = explode("/api", dirname($_SERVER['SCRIPT_FILENAME']));
$path = $path[0];
global $path;

require "$path/api/vendor/autoload.php";
require "$path/api/base.php";
require "$path/api/profile.php";
require "$path/api/search.php";
require "$path/api/manage.php";
require "$path/api/dates.php";

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

$app->post('/loginProfile', function(){
  global $body;

  loginProfile($body);
  exit;
});

$app->post('/makeAccount', function(){
  global $body;

  makeAccount($body);
  exit;
});

$app->post('/makeProfile', function(){
  global $body;

  makeProfile($body);
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

$app->get('/getDate/:profile1/:profile2/:time',function($profile1,$profile2,$time){
  getDateInfo($profile1,$profile2,$time);
  exit;
});

$app->get('/addComment/:profile1/:profile2/:time/:comment',function($profile1,$profile2,$time,$comment){
  addComment($profile1,$profile2,$time,$comment);
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

$app->get('/search/:search/:height/:hair/:hobby/:zip', function($search,$height,$hair,$hobby,$zip){
  searchProf($search,$height,$hair,$hobby,$zip);
  exit;
});

$app->get('/likeProfile/:likee', function($likee){
  likeProfile($likee);
  exit;
});

$app->get('/getProfiles', function(){
  getProfiles();
  exit;
});

$app->get('/getPermission', function(){
  getPermission();
  exit;
});

$app->get('/getSalesReport/:month/:year', function($month,$year){
    getSalesReport($month,$year);
    exit;
});

$app->run();
?>
