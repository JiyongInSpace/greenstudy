"use strict"

const socket = io();
const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-list');
const chatInput = document.querySelector('.chatting-input');
const sendButton = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');
const wrap = document.querySelector('.wrapper'),
      closeBtn = document.querySelector('.close'),
      downBtn = document.querySelector('.downClose');


    //관리자 처음 인사말
    chat_thum.addEventListener('click',function(){
        wrap.classList.add('show');
        chat_thum.style.display="none";
        chatList.innerHTML = `  <li class="received">
                                    <span class="profile">
                                        <img src="img/chat_img/1.png" alt="any" class="image">
                                    </span>
                                    <span class="text">
                                        <span class="user">Todomate</span>
                                        <div class="msg">
                                            <span class="message">
                                                안녕하세요! 반가워요 <br/>
                                                비서봇이 도와줘요! <br/><br/>
                                                    10월 2일 (해당일정) 넣어줘
                                                    10월 2일 일정 알려줘
                                            </span>
                                            <span class="time"></span> 
                                        </div>
                                    </span>
                                </li>`
    });

    //닫기 버튼
    closeBtn.addEventListener('click',function(){
        wrap.classList.remove('show');
        chat_thum.style.display="block";
    });

    //아래로 내리기 버튼
    downBtn.addEventListener('click',function(){
        if(wrap.classList.contains('down')){
            wrap.classList.remove('down');
            downBtn.style.transform = "rotate(0deg)";  
        }else{
            wrap.classList.add('down');
            downBtn.style.transform = "rotate(180deg)";
        }
    });

function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting",param);
}

const li = document.createElement('li');
var receivedDom;

//'일정 알려줘' 함수
function infoTodo(){
    var v = chatInput.value;
    //날짜 형식을 ex)(올해 년도)1001 로 변경
    var month = v.split('월');
    var day = month[1].split('일');
    month = month[0]
    day = day[0].trim();
    if(month<10){
        month = `0${month}`;
    }
    if(day<10){
        day = `0${day}`;
    }
    var date = `${new Date().getFullYear()}${month}${day}`;
    const local = JSON.parse(localStorage.getItem('todos'));

    const array = [];
    //일정이 여러개면 여러개 나오게 해야함
    for(let i=0; i<local.length; i++){
        if(local[i].day==date){
            array.push(local[i].text);
        }
    }
    console.log(array)
    if(array.length == 0){
        receivedDom =
                        `<span class="profile">
                            <img src="img/chat_img/1.png" alt="any" class="image">
                        </span>
                        <span class="text">
                            <span class="user">Todomate</span>
                            <div class="msg1">
                                <span class="message">해당 날짜에 일정이 없습니다.</span>
                                <span class="time"></span> 
                            </div>
                        </span>`
    }else if(array != null){
        receivedDom =
                        `<span class="profile">
                            <img src="img/chat_img/1.png" alt="any" class="image">
                        </span>
                        <span class="text">
                            <span class="user">Todomate</span>
                            <div class="msg">
                            <span class="message">${array}이 있습니다.</span>
                                <span class="time"></span> 
                            </div>
                        </span>`
    }
    li.classList.add('received');
    li.innerHTML = receivedDom;
    chatList.appendChild(li);
    chatInput.value = "";
}

//'일정 넣어줘'함수
function putTodo(){
    var v = chatInput.value;
    //날짜 형식을 ex)(올해 년도)1001 로 변경
    var month = v.split('월');
    var day = month[1].split('일');

    month = month[0]
    day = day[0].trim(); //공백 제거

    //일정 text 문자 추출
    var text = v.replace('넣어줘','');
        text = text.replace(`${month}월`,'');
        text = text.replace(`${day}일`,'');

        text = text.trim();

    if(month<10){
        month = `0${month}`;
    }
    if(day<10){
        day = `0${day}`;
    }

    var date = `${new Date().getFullYear()}${month}${day}`;

    const todoObj = {
        day: date,
        goal: 1,
        text: text,
        id: Date.now(),
        checked: false
    };
    
    todoArr = JSON.parse(localStorage.getItem('todos'));
    todoArr.push(todoObj);
    localStorage.setItem("todos",JSON.stringify(todoArr));
    
    receivedDom =
                `<span class="profile">
                    <img src="img/chat_img/1.png" alt="any" class="image">
                </span>
                <span class="text">
                    <span class="user">Todomate</span>
                    <div class="msg1">
                        <span class="message">해당 날짜에 일정을 넣었습니다.</span>
                        <span class="time"></span> 
                    </div>
                </span>`

    li.classList.add('received');
    li.innerHTML = receivedDom;
    chatList.appendChild(li);

    chatInput.value = "";

    const lists = document.querySelectorAll(".todo-li.TODOLIST");
    removeAllItems(lists);
    makeTodolist();
    howManyleft();
}

sendButton.addEventListener('click',()=>{
    send();
})

socket.on("chatting",(data)=>{
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);

    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);

    if(!isNaN(chatInput.value.charAt(0))){

        var message = document.querySelectorAll('.message');

            message = message[message.length-1].innerHTML;

        if(message.slice(-3) == '알려줘'){
            infoTodo();
        }else if(message.slice(-3) == '넣어줘'){
            putTodo();
            //일정 넣고 새로고침해야 들어감---?
        }
    }else{
        chatInput.value = "";
    }
})

function LiModel(name,msg,time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement('li');
        li.classList.add(nickname.value === this.name ? "sent" : "received");

        if(li.classList.contains("sent")){
            const sentDom = 
                            `<span class="profile">
                            </span>
                            <span class="text">
                                <div class="msg">
                                    <span class="time">${this.time}</span> 
                                    <span class="message">${this.msg}</span>
                                </div>
                            </span>`
            li.innerHTML = sentDom;
        }
        else{
            const receivedDom =
                                `<span class="profile">
                                    <img src="img/chat_img/1.png" alt="any" class="image">
                                </span>
                                <span class="text">
                                    <span class="user">${this.name}</span>
                                    <div class="msg">
                                        <span class="message">${this.msg}</span>
                                        <span class="time">${this.time}</span> 
                                    </div>
                                </span>`
            li.innerHTML = receivedDom;
        }

        chatList.appendChild(li);
    }
}