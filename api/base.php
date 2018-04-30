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
  $password= $data->password;

  $sql="SELECT * FROM Person WHERE SSN='$userName' AND Password='$password'";
  $result = mysqli_query($conn,$sql);

  $count=mysqli_num_rows($result);

  if($count==1){
    session_start();
    $_SESSION['loggedin'] = true;
    $_SESSION['SSN'] = $userName;

    $sql="SELECT Role FROM Employee WHERE SSN='$userName'";
    $result = mysqli_query($conn,$sql);

    $count=mysqli_num_rows($result);

    if($count>0){
      $role = mysqli_fetch_assoc($result);
      $_SESSION['role'] = $role;
      print_r(JSON_encode($role));
    }else{
      $_SESSION['role'] = 'customer';
      print_r(JSON_encode("customer"));
    }

  }else{
    print_r("false");
  }

}

function loginProfile($body){
  global $body;
  include("start.php");
  session_start();

  $data = json_decode($body);
  $userName= $data->username;
  $SSN = $_SESSION['SSN'];
  $sql="SELECT * FROM Profile WHERE ProfileID='$userName' AND OwnerSSN='$SSN'";
  $result = mysqli_query($conn,$sql);

  $count=mysqli_num_rows($result);

  if($count==1){
    $_SESSION['username'] = $userName;
    print_r("true");
  }else{
    print_r("false");
  }
}

function getProfiles(){
  include("start.php");
  session_start();

  $SSN = $_SESSION['SSN'];
  $sql="SELECT * FROM Profile WHERE OwnerSSN='$SSN'";
  $result = mysqli_query($conn,$sql);

  $info = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $info[] = $row;
  }

  print_r(JSON_encode($info));
}

function getPermission(){
  include("start.php");
  session_start();
  $userName = $_SESSION['SSN'];

  $sql="SELECT Role FROM Employee WHERE SSN='$userName'";
  $result = mysqli_query($conn,$sql);

  $role = mysqli_fetch_assoc($result);
  $count=mysqli_num_rows($result);
  if($count>0){
    $_SESSION['role'] = $role;
  }else{
    $role = 'customer';
    $_SESSION['role'] = $role;
  }
  print_r(JSON_encode($role));
}

function loggedin(){
  include("start.php");
  session_start();

  if($_SESSION['loggedin'] == true){
    $userName = $_SESSION['SSN'];
    $sql="SELECT * FROM Person WHERE SSN='$userName'";
    $result = mysqli_query($conn,$sql);
    $count=mysqli_num_rows($result);

    if($count>0){
         $role = $_SESSION['role'];
      if($role == 'customer'){
        $userName= $_SESSION['username'];
        $SSN = $_SESSION['SSN'];
        $sql="SELECT * FROM Profile WHERE ProfileID='$userName' AND OwnerSSN='$SSN'";
        $result = mysqli_query($conn,$sql);
        $count=mysqli_num_rows($result);
          if($count>0){
            print_r("2,customer");
          }else{
            print_r("1,customer");
          }
      }else{
        print_r("1,");
        print_r($_SESSION);
      }
    }
  }else{
    print_r("0,0");
  }
}

function logout(){
  include("start.php");
  session_start();
  $_SESSION['loggedin'] = false;
  $_SESSION['SSN'] = "";
  $_SESSION['username'] = "";
  $_SESSION['role'] = "";
}
?>
