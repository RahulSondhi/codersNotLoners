<?php

function getDateInfo($profile1,$profile2,$time){
  include("start.php");
  session_start();
  if (profileExists($profile1) && profileExists($profile2)) {
    $info = array();
    $sql="SELECT * FROM Date WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";
    $result = mysqli_query($conn,$sql);
    while ($row = mysqli_fetch_assoc($result)) {
      $info[] = $row;
    }
  }else{
    $info = "Unvalid";
  }

  print_r(JSON_encode($info));
}

function addComment($profile1,$profile2,$time,$comment){
  include("start.php");
  session_start();
  if (profileExists($profile1) && profileExists($profile2)) {
    $info = array();
    $sql="UPDATE Date SET Comments = '$comment' WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";
    if ($conn->query($sql) === TRUE) {
      $sql="SELECT * FROM Date WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";
      $result = mysqli_query($conn,$sql);
      while ($row = mysqli_fetch_assoc($result)) {
        $info[] = $row;
      }
    }
  }else{
    $info = "Unvalid";
  }

  print_r(JSON_encode($info));
}
?>
