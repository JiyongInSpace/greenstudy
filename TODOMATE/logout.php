<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>logout</title>
</head>
<body>
    <!-- logout.php -->
</body>
</html>

<style>
    body{background:#000;color:#fff;}
    a{color:#fff;text-decoration:none;}
</style>

<?php
    session_start();
    session_destroy();
    echo 
    "<script>
        location.href='index.html';
    </script>";
?>
