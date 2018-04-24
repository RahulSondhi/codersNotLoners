<?php

function searchProf($search){
  include("start.php");

    $info = array();
    $sql="SELECT * FROM Profile WHERE ProfileID like '$search'";
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
