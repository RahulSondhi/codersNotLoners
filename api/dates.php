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

function checkingDate(){
  include("start.php");
  session_start();

  if(array_key_exists('loggedin', $_SESSION)){
    if($_SESSION['loggedin'] == true){
    $userName = $_SESSION['SSN'];
    $sql="SELECT * FROM Person WHERE SSN='$userName'";
    $result = mysqli_query($conn,$sql);
    $count=mysqli_num_rows($result);

    if($count>0){
         $role = $_SESSION['role'];
      if($role == 'customer' && array_key_exists('username', $_SESSION)){
        $userName= $_SESSION['username'];
        $SSN = $_SESSION['SSN'];
        $sql="SELECT * FROM Profile WHERE ProfileID='$userName' AND OwnerSSN='$SSN'";
        $result = mysqli_query($conn,$sql);
        $count=mysqli_num_rows($result);
          if($count>0){
            print_r($userName);
            print_r(",customer");
          }else{
            print_r("1,customer");
          }
      }else{
        print_r("1,");
        print_r($role);
      }
    }
  }else{
    print_r("0,0");
  }
  }else{
    print_r("0,0");
  }
}

function saveDate($body,$profile1,$profile2,$time){
  global $body;
  include("start.php");
  session_start();

  if (profileExists($profile1) && profileExists($profile2)) {
    $info = array();
    $data = json_decode($body);
    $location= $data->Location;
    $timing= $data->timing;
    $BookingFee= $data->BookingFee;
    $Rating1= $data->dateRatingPerson1;
    $Rating2= $data->dateRatingPerson2;

    $sql="UPDATE Date SET Location = '$location', Date_Time = '$timing', BookingFee = '$BookingFee', User1Rating = '$Rating1', User2Rating = '$Rating2' WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";

    if ($conn->query($sql) === TRUE) {
      $info = "Valid";
    }else{
      $info = "Unvalid";
    }

  print_r(JSON_encode($info));
  }
}

function removeDate($profile1,$profile2,$time){
  include("start.php");
  session_start();

  if (profileExists($profile1) && profileExists($profile2)) {
    $me = $_SESSION['username'];
    $permissionAdmin = ($_SESSION['role'] == "Manager" || $profile1 == $me || $profile2 == $me);

    if($permissionAdmin){
        $info = array();

        $sql="DELETE FROM Date WHERE Profile1='$profile1' AND Profile2='$profile2' AND Date_Time='$time'";

        if ($conn->query($sql) === TRUE) {
          $info = "Valid";
        }else{
          $info = "Unvalid";
        }

      print_r(JSON_encode($info));
    }
  }
}
?>
