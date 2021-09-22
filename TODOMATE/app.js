const express = require("express");
// 필요한 express 라이브러리를 가져오고 변수에 담아줌
const app = express();
// express 실행한 내용을 app에 담아줌

const http = require("http");
const path = require("path");
const server = http.createServer(app);
const soketIO = require("socket.io");
const io = soketIO(server);

const moment = require("moment");

app.use(express.static(path.join(__dirname,"")));
const PORT = process.env.PORT || 5000;
//서버 만들어주고(1)

io.on("connection",(socket)=>{
    socket.on("chatting",(data)=>{
        const {name, msg} = data;

        io.emit("chatting",{
            name : name,
            msg : msg,
            time : moment(new Date()).format("h:mm A")
        });
    })
})

server.listen(PORT,()=>console.log(`server is running ${PORT}`));

//nodemon 설치해 서버가 자동으로 재시작하게끔함(2)