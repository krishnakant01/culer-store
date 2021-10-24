<?php
if(isset($_POST['submit']))
{ 
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['pass']))
	header("location:signUp.html");
else
{
	$a=$_POST['name'];
	$b=$_POST['email'];
	$c=$_POST['pass'];
}

$dbHost = '127.0.0.1';//or localhost
$dbName = 'user database'; // your db_name
$dbUsername = 'root'; // root by default for localhost 
$dbPassword = '';  // by default empty for localhost

$conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected Successfully";


$sql = "CREATE TABLE if not exists user(
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password varchar(30) NOT NULL)";
if(mysqli_query($conn, $sql))
{
    echo "<br>Table created successfully</br>";
} 
else
{
    echo "ERROR: Could not create table " . mysqli_error($conn);
}



$sql = "INSERT INTO user VALUES ('$a','$b','$c')";
if(mysqli_query($conn, $sql)){
    echo "Records inserted successfully.";
} 
else
{
    echo "ERROR: Could not insert values " . mysqli_error($conn);
}

$sql = "select * from user";

if($result = mysqli_query($conn, $sql)){
    if(mysqli_num_rows($result) > 0){
     
        while($row = mysqli_fetch_array($result)){
                
                echo "<br>";
                echo " " . $row['name'];
                echo " " . $row['email'];
        }
      
        // Free result set
        mysqli_free_result($result);
    } 
    else{
        echo "No records could be retrieved.";
    }
}

mysqli_close($conn);

 }
 else
 {
 	header("location:signUp.html");
 }
?>