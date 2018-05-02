<?php
function makeAccount(){
  global $body;
  include("start.php");
  session_start();

  $data = json_decode($body);
  $SSN= $data->SSN;
  $Password= $data->Password;
  $FirstName= $data->FirstName;
  $LastName= $data->LastName;
  $Email= $data->Email;
  $Street= $data->Street;
  $City= $data->City;
  $State= $data->State;
  $Zip= $data->Zip;
  $Telephone= $data->Telephone;
  $time = date('Y-m-d H:i:s');
  $PPP = "User-User";
  $Rating = 0;

  $sql = "INSERT INTO Person VALUES ('$SSN', '$Password', '$FirstName', '$LastName', '$Street', '$City', '$State', '$Zip', '$Email', '$Telephone');";
  if (mysqli_query($conn, $sql)) {
    $sql = "INSERT INTO User VALUES ('$SSN', '$PPP', '$Rating', '$time');";
    if (mysqli_query($conn, $sql)) {
      print_r(JSON_encode("New"));
    } else {
      print_r(JSON_encode("Error:" . mysqli_error($conn)));
    }
  } else {
    print_r(JSON_encode("Error:" . mysqli_error($conn)));
  }
}

function makeProfile(){
  global $body;
  include("start.php");
  session_start();

  $data = json_decode($body);
  $SSN = $_SESSION['SSN'];
  $ProfileID= $data->ProfileID;
  $AgeRangeStart= $data->AgeRangeStart;
  $AgeRangeEnd= $data->AgeRangeEnd;
  $Georange= $data->Georange;
  $Hobbies= $data->Hobbies;
  $Age= $data->Age;
  $Sex= $data->Sex;
  $Height= $data->Height;
  $Weight= $data->Weight;
  $HairColor= $data->HairColor;
  $Cardnum= $data->Cardnum;
  $Acctnum= $data->Acctnum;
  $time = date('Y-m-d H:i:s');

  $sql = "INSERT INTO Profile VALUES ('$ProfileID','$SSN', '$Age', '$AgeRangeStart', '$AgeRangeEnd', '$Georange', '$Sex', '$Hobbies', '$Height', '$Weight', '$HairColor','$time','$time');";
  if (mysqli_query($conn, $sql)) {
    $sql = "INSERT INTO Account VALUES ('$SSN', '$Cardnum', '$Acctnum','$time');";
    if (mysqli_query($conn, $sql)) {
      print_r(JSON_encode("New"));
    } else {
      print_r(JSON_encode("Error:" . mysqli_error($conn)));
    }
  } else {
    print_r(JSON_encode("Error:" . mysqli_error($conn)));
  }
}

function getSettings($role,$id){
  include("start.php");
  session_start();
  $return = "0";
  $me = false;
  $permissionAdmin = ($_SESSION['role'] == "CustRep" || $_SESSION['role'] == "Manager");
  $packet = array();
  $info = array();

  if($role == "me"){
    $role = $_SESSION['role'];
    if($permissionAdmin){
      $id = $_SESSION['SSN'];
    }else{
      $id = $_SESSION['username'];
    }
    $me = true;
  }

  if($role == "customer"){
    if($id == $_SESSION['username'] || $permissionAdmin == true){
      $sql="SELECT * FROM Person p,User u, Account a,Profile r WHERE r.ProfileID ='$id' AND r.OwnerSSN=p.SSN AND u.SSN=a.OwnerSSN AND p.SSN=u.SSN";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }

      $return = "1";
    }
  }else if($role == "CustRep"){
    if(employeeExists($id) && $permissionAdmin == true){
      $sql="SELECT * FROM Person p,Employee e WHERE e.SSN='$id' AND e.SSN=p.SSN";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }

      $return = "2";
    }
  }else if($role == "Manager"){
    if(employeeExists($id) && $permissionAdmin == true){
      $sql="SELECT * FROM Person p,Employee e WHERE e.SSN='$id' AND e.SSN=p.SSN";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }

      $return = "3";
    }
  }

  $packet[] = $return;
  $packet[] = $role;
  $packet[] = $me;
  $packet[] = $info;
  print_r(JSON_encode($packet));
}

function employeeExists($userName){
  include("start.php");

  $sql="SELECT * FROM Employee e WHERE e.SSN='$userName'";
  $result = mysqli_query($conn,$sql);

  $count=mysqli_num_rows($result);

  if($count>0){
    return true;
  }else{
    return false;
  }
}
?>
