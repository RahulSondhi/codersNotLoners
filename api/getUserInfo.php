<?php

function startEmUp(){
  global $path;
  include("start.php");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
    echo "Connected successfully";
}

function login($body){
  global $body;
  include("start.php");

  $_SESSION['loggedin'] = false;

  $data = json_decode($body);
  $userName= $data->username;

  $sql="SELECT * FROM Profile WHERE ProfileID='$userName'";
  $result = mysqli_query($conn,$sql);

  $count=mysqli_num_rows($result);

  if($count==1){
    session_start();
    $_SESSION['loggedin'] = true;
    $_SESSION['username'] = $userName;
    print_r("true");
  }else{
    print_r("false");
  }

}

function getProfile($profile){
  include("start.php");
  session_start();

  if($profile == "me"){
    $profile = $_SESSION['username'];
    $sql="SELECT * FROM Profile WHERE ProfileID='$profile'";
    $result = mysqli_query($conn,$sql);
    $info = $result->fetch_assoc();
  }elseif (profileExists($profile)) {
    $sql="SELECT * FROM Profile WHERE ProfileID='$profile'";
    $result = mysqli_query($conn,$sql);
    $info = $result->fetch_assoc();
  }else{
    $info = "Unvalid";
  }

  print_r(JSON_encode($info));

}

function profileExists($userName){
  include("start.php");

  $sql="SELECT * FROM Profile WHERE ProfileID='$userName'";
  $result = mysqli_query($conn,$sql);

  $count=mysqli_num_rows($result);

  if($count==1){
    return true;
  }else{
    return false;
  }
}

function loggedin(){
  include("start.php");
  session_start();
  print_r($_SESSION['loggedin']);
}

function logout(){
  include("start.php");
  session_start();
  $_SESSION['loggedin'] = false;
  $_SESSION['username'] = "";
}

function getLikes($profile){
  include("start.php");
  session_start();

  if($profile == "me"){
    $info = array();
    $profile = $_SESSION['username'];
    $sql="SELECT * FROM Likes WHERE Liker='$profile' OR Likee='$profile'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
      $info[] = $row;
    }
  }elseif (profileExists($profile)) {
    $info = array();
    $sql="SELECT * FROM Likes WHERE Liker='$profile' OR Likee='$profile'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
      $info[] = $row;
    }
  }else{
    $info = "Unvalid";
  }

  print_r(JSON_encode($info));
}

function getDates($profile){
  include("start.php");
  session_start();

  if($profile == "me"){
    $info = array();
    $profile = $_SESSION['username'];
    $sql="SELECT * FROM Date WHERE Profile1='$profile' OR Profile2='$profile'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
      $info[] = $row;
    }
  }elseif (profileExists($profile)) {
    $info = array();
    $sql="SELECT * FROM Date WHERE Profile1='$profile' OR Profile2='$profile'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
      $info[] = $row;
    }
  }else{
    $info = "Unvalid";
  }

  print_r(JSON_encode($info));
}
?>
