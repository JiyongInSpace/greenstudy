<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>join-ok</title>
</head>
<body>
    <!-- join-ok.php -->
</body>
</html>

<style>
    body{background:#000;color:#fff;}
</style>

<?php
    include_once 'db.php';

    $id=$_POST['id'];
    $pw=$_POST['pw'];
    $email=$_POST['email'];
    $query="INSERT INTO 
            members(
                UserID,
                UserPW,
                email
            )
            VALUES(
                '$id',
                '$pw',
                '$email'
            )";
    mysqli_query($connect,$query);

    //echo $id,"<br>";
    //echo $pw,"<br>";
    //echo $email;
?>

<script>
    location.href="login.php";
</script>
