<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <!-- login.php -->
    <article>
        <h2>LOGIN</h2>
        <div>
            <form action="login-ok.php" method="post">
                <ul>
                    <li>
                        <span>ID</span><br>
                        <input type="text" name="id">
                    </li>
                    <li>
                        <span>Password</span> <br>
                        <input type="password" name="pw">
                    </li>
                    <li>
                        <input type="submit" value="login"><br>
                        <a href="join.php">join</a>
                        <a href="index.html">home</a>
                    </li>
                </ul>
            </form>
            
        </div>
        
    </article>
</body>
</html>

<style>
    *{box-sizing: border-box;}
    ul{
        list-style:none;
        margin:0;
        padding:0;
    }
    body{background:#000;color:#fff;}
    article{
        width:300px; 
        border:1px solid #ddd;
        position:absolute;
        left:50%; top:50%;
        transform: translate(-50%, -50%);
    }
    article h2{
        margin:0;
        text-align:center;
        background:#777;
    }
    article div{
        display:flex;
        justify-content: center;
        align-items:center;
    }
    article div input{
        width:65%;
        display:inline-block;
        margin-bottom:5%;
    }
    article div input[type="submit"]{width:60px;}
    /* article div span:nth-of-type(1){margin-right:23.7%;} */
    article div form a{
        text-align: center;
        width:60px;
        background:#fff; 
        color:#000;
        text-decoration:none;
        display: inline-block;
        padding:2px 5px;
        border-radius:2px;
        font-size:14px;
    }
    form{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    li{text-align: center;}
</style>

