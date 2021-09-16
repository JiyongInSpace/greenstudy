<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>join</title>
</head>
<body>
    <!-- join.php -->

</body>
</html>
    <fieldset class="sign-up">
        <legend>join page</legend>
        <form action="join-ok.php" name="join" method="post">
            <ul>
                <li>
                    <label>아이디</label>
                    <input type="text" name="id" required></input>
                </li>
                <li>
                    <label>비밀번호</label>
                    <input type="password" id="pw" name="pw" required></input>
                </li>
                <li>
                    <label>비밀번호 확인</label>
                    <input type="password" id="pw-re" name="pw-re" required></input>
                </li>
                <li>
                    <label>이메일</label>
                    <input type="email" name="email" required></input>
                </li>
                <li>
                    <input type="submit" value="회원가입"></input>
                    <a href="login.php">로그인 페이지로</a>
                    <a href="index.html">첫 페이지로</a>
                </li>
            </ul>
        </form>
        
    </fieldset>

<style>
    body{background:#000; color:#fff;}
    ul{list-style:none; margin:0; padding:0;}
    li{
        margin:0; padding:0;
        padding:10px 0;
    }
    li:nth-of-type(1) input{margin-left:53.5px}
    li:nth-of-type(2) input{margin-left:37.5px}
    li:nth-of-type(4) input{margin-left:53.5px}
    li:last-of-type{text-align:center;}
    fieldset{
        width:30%;
        margin:0 auto;
        position:absolute;
        left:50%; top:50%;
        transform: translate(-50%, -50%)
    }
    form{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    a{
        background:#fff; 
        color:#000;
        text-decoration:none;
        display: inline-block;
        margin-top:10px; margin-left:10px;
        padding:2px 5px;
        border-radius:2px;
        font-size:14px;
    }
    @media(max-width:950px){
        li{
        margin:0; padding:0;
        padding:10px 0;
        }
        li:nth-of-type(1) input{margin-left:100px}
        li:nth-of-type(2) input{margin-left:100px}
        li:nth-of-type(3) input{margin-left:100px}
        li:nth-of-type(4) input{margin-left:100px}
    }
</style>

<script type="text/javascript">
    const elSubmit=document.querySelector('input[type=submit]');
    function test() {
        var p1 = document.getElementById('pw').value;
        var p2 = document.getElementById('pw-re').value;
        if( p1 != p2 ) {
            alert("비밀번호가 일치 하지 않습니다");
            return false;
        }else{
            join.submit();
        }
    }
    elSubmit.addEventListener("click",function(e){
        e.preventDefault();
        test();

    })
</script>
