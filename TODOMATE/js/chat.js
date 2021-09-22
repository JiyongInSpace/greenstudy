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
                                            <span class="message">안녕하세요! 반가워요</span>
                                            <span class="time"></span> 
                                        </div>
                                    </span>
                                </li>`
    });

    closeBtn.addEventListener('click',function(){
        wrap.classList.remove('show');
        chat_thum.style.display="block";
    });

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
    chatInput.value = "";
}

sendButton.addEventListener('click',()=>{
    send();
})


socket.on("chatting",(data)=>{
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);

    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
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