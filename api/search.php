<?php

function searchProf($search,$height,$hair,$hobby,$zip){
  include("start.php");

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
    $sql="SELECT * FROM Person P,Profile WHERE ProfileID like '%$search%' AND Height like '%$height%' AND HairColor like '%$hair%' AND Hobbies like '%$hobby%' AND OwnerSSN = P.SSN AND P.Zipcode like '%$zip%'";
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
