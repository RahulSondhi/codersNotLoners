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
    $me = $_SESSION['username'];
    $custMe = $_SESSION['SSN'];
    if($_SESSION['role'] == "Manager"){
      $comment = $comment." [Manager]";
    }else if($_SESSION['role'] == "CustRep"){
      $comment = $comment." [CustRep]";
    }else{
      $comment = $comment." [".$me."]";
    }
    $permissionAdmin = ($_SESSION['role'] == "Manager" || $profile1 == $me || $profile2 == $me);
    if($permissionAdmin){
          $sql="UPDATE Date SET Comments = '$comment' WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";
    }else{
          $sql="UPDATE Date SET Comments = '$comment' WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time' AND CustRep='$custMe'";
    }
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
