<?php

function getSalesReport($month,$year){
    include("start.php");
    session_start();
    
    $sql="SELECT * FROM Date WHERE CONTAINS(Date_Time, $year + '-' + $month)";
    $result = mysqli_query($conn,$sql);
    
    while($row = mysqli_fetch_assoc($result)){
        $info[] = $row;
    }
    
    print_r(JSON_encode($info));
    
}

?>
