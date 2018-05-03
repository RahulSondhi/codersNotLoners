<?php

function searchProf($search,$height,$hair,$hobby,$zip,$filter){
  include("start.php");
  session_start();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

    if($search == "-1"){
      $search = "";
    }
    if($height == "-1"){
      $height = "";
    }
    if($hair == "-1"){
      $hair = "";
    }

    if($hobby == "-1"){
      $hobby = "";
    }

    if($zip == "-1"){
      $zip = "";
    }

    $info = array();
    if($filter == "Rating"){
      $sql="SELECT DISTINCT M_F,ProfileID,Age,Rating FROM User u,Person P,Profile WHERE ProfileID like '%$search%' AND Height like '%$height%' AND HairColor like '%$hair%' AND Hobbies like '%$hobby%' AND OwnerSSN = P.SSN AND P.Zipcode like '%$zip%' AND u.SSN=OwnerSSN ORDER BY Rating DESC";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
    }else if($filter == "Active"){
      $sql="SELECT M_F,ProfileID,Age,DateOfLastAct FROM User u,Person P,Profile WHERE ProfileID like '%$search%' AND Height like '%$height%' AND HairColor like '%$hair%' AND Hobbies like '%$hobby%' AND OwnerSSN = P.SSN AND P.Zipcode like '%$zip%' AND u.SSN=OwnerSSN ORDER BY DateOfLastAct DESC";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
    }else if($filter == "Revenue" && $permissionAdmin){
      $sql="SELECT M_F,ProfileID,Age,SUM(u.BookingFee) AS Revenue FROM Date u,Person P,Profile WHERE ProfileID like '%$search%' AND Height like '%$height%' AND HairColor like '%$hair%' AND Hobbies like '%$hobby%' AND OwnerSSN = P.SSN AND P.Zipcode like '%$zip%' AND (u.Profile1 = ProfileID || u.Profile2 = ProfileID) GROUP BY ProfileID ORDER BY Revenue DESC";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
    }else{
      $sql="SELECT M_F,ProfileID,Age FROM Person P,Profile WHERE ProfileID like '%$search%' AND Height like '%$height%' AND HairColor like '%$hair%' AND Hobbies like '%$hobby%' AND OwnerSSN = P.SSN AND P.Zipcode like '%$zip%'";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
    }

    print_r(JSON_encode($info));
}

function searchDated($search,$filter){
  include("start.php");
  session_start();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

    if($search == "-1"){
      $search = "";
    }

    if($permissionAdmin){
      $info = array();
      $sql="SELECT DISTINCT M_F,ProfileID,Age FROM Date d,Person P,Profile WHERE (d.Profile1 = '$search' OR d.Profile2 = '$search') AND (d.Profile1 = ProfileID OR d.Profile2 = ProfileID) AND OwnerSSN = P.SSN AND    ProfileID != '$search'";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }

      print_r(JSON_encode($info));
    }
}

function searchEmployee($search,$filter){
  include("start.php");
  session_start();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

    if($search == "-1"){
      $search = "";
    }
    $info = array();

    if($filter == "Revenue" && $permissionAdmin){
      $sql="SELECT e.Role, e.SSN, P.FirstName, P.LastName, d.CustRep, SUM(d.BookingFee) AS Revenue FROM Date d,Person P,Employee e WHERE e.SSN = P.SSN AND (P.FirstName like '%$search%' OR P.LastName like '%$search%') AND e.SSN = d.CustRep GROUP BY d.CustRep ORDER BY Revenue DESC";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
    }else{
      $sql="SELECT e.Role, e.SSN, P.FirstName, P.LastName FROM Person P,Employee e WHERE e.SSN = P.SSN AND (P.FirstName like '%$search%' OR   P.LastName like '%$search%') ";
      $result = mysqli_query($conn,$sql);
      $count= mysqli_num_rows($result);

      if($count > 0){
        while ($row = mysqli_fetch_assoc($result)) {
          $info[] = $row;
        }
      }else{
        $info = "Unvalid";
      }
  }

    print_r(JSON_encode($info));
}

function searchAll(){
  include("start.php");

    $info = array();
    $sql="SELECT * FROM Profile";
    $result = mysqli_query($conn,$sql);

    $count= mysqli_num_rows($result);

    if($count > 0){
      while ($row = mysqli_fetch_assoc($result)) {
        $info[] = $row;
      }
    }else{
      $info = "Unvalid";
    }

    print_r(JSON_encode($info));
}

 ?>
