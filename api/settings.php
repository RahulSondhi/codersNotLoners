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

function saveSettings(){
  global $body;
  include("start.php");
  session_start();
  $send = false;
  $permissionAdmin = ($_SESSION['role'] == "CustRep" || $_SESSION['role'] == "Manager");

  $data = json_decode($body);
  $SSN= $data->SSN;
  $Password= $data->Password;
  $Email= $data->Email;
  $Street= $data->Street;
  $City= $data->City;
  $State= $data->State;
  $Zip= $data->Zipcode;
  $Telephone= $data->Telephone;
  $time = date('Y-m-d H:i:s');
  $admin = $data->admin;

  if($admin == "no"){
    $ProfileID= $data->ProfileID;
    $AgeRangeStart= $data->DatingAgeRangeStart;
    $AgeRangeEnd= $data->DatingAgeRangeEnd;
    $Georange= $data->DatinGeoRange;
    $Hobbies= $data->Hobbies;
    $Age= $data->Age;
    $Height= $data->Height;
    $Weight= $data->Weight;
    $HairColor= $data->HairColor;
    $PPP= $data->PPP;
  }else{
    $Role = $data->Role;
    $Rate = $data->Rate;
  }

  if($ProfileID == $_SESSION['username'] || $SSN == $_SESSION['SSN'] || $permissionAdmin == true){
    $sql = "UPDATE Person SET Password='$Password', Street='$Street', City = '$City', State = '$State', Zipcode = '$Zip', Email='$Email', Telephone='$Telephone' WHERE SSN = '$SSN'";
    if (mysqli_query($conn, $sql)) {
      if($admin == "no"){
        $sql = "UPDATE Profile SET Age='$Age', DatingAgeRangeStart='$AgeRangeStart', DatingAgeRangeEnd='$AgeRangeEnd', DatinGeoRange='$Georange', Hobbies='$Hobbies', Height='$Height', Weight='$Weight', HairColor='$HairColor', LastModDate='$time' WHERE ProfileID = '$ProfileID'";
        if (mysqli_query($conn, $sql)) {
          $sql = "UPDATE User SET PPP='$PPP', DateOfLastAct='$time' WHERE SSN = '$SSN'";
          if (mysqli_query($conn, $sql)) {
            $send = true;
          }
        }
      }else{
        $sql = "UPDATE Employee SET Role='$Role', HourlyRate='$Rate' WHERE SSN = '$SSN'";
        if (mysqli_query($conn, $sql)) {
          $send = true;
        }
      }
    }
  }

  print_r(JSON_encode($send));
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

function deleteProfile($who,$SSN){
  include("start.php");
  session_start();
  $send = "No";
  $permissionAdmin = ($_SESSION['role'] == "CustRep" || $_SESSION['role'] == "Manager");

  if($SSN == $_SESSION['SSN'] || $permissionAdmin == true){
      $sql="DELETE Profile, Date, Likes, Referral, SuggestedBy FROM Profile, Date, Likes, Referral, SuggestedBy WHERE Profile.ProfileID='$who' AND (Profile.ProfileID = Date.Profile1 OR Profile.ProfileID = Date.Profile2) AND (Profile.ProfileID = Likes.Liker OR Profile.ProfileID = Likes.Likee) AND (Profile.ProfileID = Referral.ProfileA OR Profile.ProfileID = Referral.ProfileB OR Profile.ProfileID = Referral.ProfileC) AND (Profile.ProfileID = SuggestedBy.Profile1 OR Profile.ProfileID = SuggestedBy.Profile2)";
      if (mysqli_query($conn, $sql)) {
        if($who == $_SESSION['username']){
          $send = true;
        }else{
          $send = false;
        }
      }else{
        print_r(JSON_encode("Error:" . mysqli_error($conn)));
      }
  }

  print_r(JSON_encode($send));
}

function deleteAccount($who){
  include("start.php");
  session_start();
  $send = "No";
  $permissionAdmin = ($_SESSION['role'] == "CustRep" || $_SESSION['role'] == "Manager");

  if($who == $_SESSION['SSN'] || $permissionAdmin == true){
      $sql="DELETE FROM Person WHERE Person.SSN='$who'";
      if (mysqli_query($conn, $sql)) {
        if($who == $_SESSION['SSN']){
          $send = true;
        }else{
          $send = false;
        }
      }else{
        print_r(JSON_encode("Error:" . mysqli_error($conn)));
      }
      echo($who);
  }

  print_r(JSON_encode($send));
}

?>
