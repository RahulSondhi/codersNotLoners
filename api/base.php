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
?>
