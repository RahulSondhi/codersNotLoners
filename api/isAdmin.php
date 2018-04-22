<?php
function getStatus()
{
	global $path;
	$structure = $path."/data/";
	$user="";
        $adminData = json_decode(file_get_contents($structure."admins.json"));
        $permissions=array();
	$permissions["admin"] = in_array($user,$adminData -> admins);
	$permissions["rep"]= (in_array($user,$adminData -> reps) || $permissions["admin"]);


	return $permissions;
}


?>
