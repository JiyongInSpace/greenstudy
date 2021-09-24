<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login-ok</title>
</head>
<body>
    <!-- login-ok.php -->
</body>
</html>

<style>
    body{background:#000;color:#fff;}
</style>

<?php
    @session_start();

    include_once 'db.php';

    $id=$_POST['id'];
    $pw=$_POST['pw'];
    $query = "SELECT * FROM members 
    WHERE userID='$id' AND userPW='$pw'";
    $result = mysqli_query($connect,$query);
    $row = mysqli_num_rows($result);

    $result2 = mysqli_query($connect,$query);
    $row2 =mysqli_fetch_array($result2);


    if($row){
        $_SESSION['id'] = $row2['id'];
        echo 
        "<script>
            localStorage.id='$id';
            location.href='index.html';
        </script>";
    }else{
        echo 
        "<script>
            alert('ID와 Password를 확인해주세요.');
            history.back();
        </script>";
    }

?>
