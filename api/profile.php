<?php

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
