<?php

function getDateSuggestions($profile){
  include("start.php");
  session_start();
  $info = array();
  $permissionAdmin = ($_SESSION['role'] == "Manager"||$_SESSION['role'] == "CustRep");

  if($permissionAdmin){
    $sql="SELECT DISTINCT ProfileID FROM Referral r,Profile WHERE (r.ProfileB = '$profile' AND ProfileID = r.profileC)OR( r.ProfileC = '$profile' AND ProfileID = r.profileB)";
    $result = mysqli_query($conn,$sql);

    while($row = mysqli_fetch_assoc($result)){
        $info[] = $row;
    }

    print_r(JSON_encode($info));
  }else{
    print_r(JSON_encode("Permission Denied"));
  }
}

function getSalesReport($month,$year){
  include("start.php");
  session_start();
  $info = array();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

  if($permissionAdmin){
    $sql="SELECT * FROM codersNotLoners.Date WHERE MONTH(Date_Time)=$month AND YEAR(Date_Time)=$year";
    $result = mysqli_query($conn,$sql);

    while($row = mysqli_fetch_assoc($result)){
        $info[] = $row;
    }

    print_r(JSON_encode($info));
  }else{
    print_r(JSON_encode("Permission Denied"));
  }
}

function getDateDayRanking(){
  include("start.php");
  session_start();
  $info = array();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

  if($permissionAdmin){
    $sql="SELECT Date(Date_Time), COUNT(*) AS frequency FROM codersNotLoners.Date GROUP BY DATE(Date_Time) ORDER BY frequency DESC";
    $result = mysqli_query($conn,$sql);

    while($row = mysqli_fetch_assoc($result)){
        $info[] = $row;
    }

    print_r(JSON_encode($info));
  }else{
    print_r(JSON_encode("Permission Denied"));
  }
}

function getMailList(){
  include("start.php");
  session_start();
  $info = array();
  $permissionAdmin = ($_SESSION['role'] == "CustRep" || $_SESSION['role'] == "Manager");

  if($permissionAdmin){
    $sql="SELECT Email FROM Person P, User U WHERE P.SSN = U.SSN";
    $result = mysqli_query($conn,$sql);

    while($row = mysqli_fetch_assoc($result)){
        $info[] = $row;
    }

    print_r(JSON_encode($info));
  }else{
    print_r(JSON_encode("Permission Denied"));
  }
}

function getRevenueSummary($param,$data){
  include("start.php");
  session_start();
  $info = array();
  $permissionAdmin = ($_SESSION['role'] == "Manager");

  if($permissionAdmin){
    if($param == "date"){
      $sql="SELECT * FROM Date WHERE date(Date_Time)='$data'";
      $result = mysqli_query($conn,$sql);

      while($row = mysqli_fetch_assoc($result)){
          $info[] = $row;
      }

      print_r(JSON_encode($info));
    }else{
      $sql="SELECT * FROM Date WHERE Profile1 = '$data' OR Profile2 ='$data'";
      $result = mysqli_query($conn,$sql);

      while($row = mysqli_fetch_assoc($result)){
          $info[] = $row;
      }

      print_r(JSON_encode($info));
    }
  }else{
    print_r(JSON_encode("Permission Denied"));
  }
}

?>
