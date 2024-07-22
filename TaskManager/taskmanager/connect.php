<?php
$servername="localhost";
$username = "root";
$password = "";
$dbname = "task-manager";

$con =mysqli_connect($servername, $username, $password, $dbname);
//$con=new mysqli('localhost','root','','task-manager');
if($con){
 echo "Connection successfully ";
 

}
else{
die( mysqli_error($con));

}



?>