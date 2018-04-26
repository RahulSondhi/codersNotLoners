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

function likeProfile($likee){
  include("start.php");
  session_start();

  if($likee == $_SESSION['username']){
    print_r("N/A");
  }else{
    $name = $_SESSION['username'];
    $date = gmdate('Y-m-d h:i:s \G\M\T');
    $sql="INSERT INTO Likes VALUES ('$name', '$likee', CURRENT_TIMESTAMP);";

    if ($conn->query($sql) === TRUE) {
      echo "Like";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}
?>
